<!--記事編集用のコンポーネント-->
<!--現状の課題メモ: 閲覧者側ではcontentに直接アクセスして悪意のあるhtmlを入れられてもサニタイズしているので無効化されるが
エディタ側ではそのまま表示されてしまうので今後複数ユーザーが編集できるようにした場合は内部向けシステムなのでそこまでないとは思うがXSSのリスクがある。
まあ一応エディタから直接htmlを入力することはできないので相当熟練したユーザーじゃない限り難しいけど-->
<template>
  <div class="container" style="text-left">
    <client-only>
      <v-form v-model="isValid" lazy-validation>
        <!--タイトルのテキストフィールド-->
        <v-text-field
          label="タイトル"
          filled
          required
          :rules="[required]"
          v-model="title"
        ></v-text-field>
        <!--サムネイルアップロード用-->
        サムネイル<UploadImage @setImage="setImage" />
        <!--記事の所属プロジェクトのプルダウン avaprojects変数に現在のユーザーが参加しているすべてのプロジェクトの一覧が格納-->
        <v-select
          :items="avaprojects"
          required
          :rules="[required]"
          label="この記事の所属プロジェクト"
          v-model="project"
          item-text="projectname"
          item-value="id"
          return-object
          outlined
        ></v-select>
        <!--短い紹介用のテキストフィールド-->
        <v-text-field
          label="短い紹介"
          :rules="[required]"
          v-model="short_description"
        ></v-text-field>
        <!--<v-text-field
        label="タグ (スペース区切り)"
        v-model="tagsraw"
      ></v-text-field>-->
        <!--カテゴリのプルダウン avacategoriesに現在存在するすべてのカテゴリが格納 なおこの部分については選択されたものがcategoryに格納される際、カテゴリ名ではなくカテゴリIDが格納されるようになっているので注意-->
        <v-select
          :items="avacategories"
          label="カテゴリー"
          v-model="category"
          item-text="name"
          item-value="id"
          :rules="[required]"
          required
          return-object
          outlined
        ></v-select>
      </v-form>
      <!--記事本文の編集フォーム 書いた内容はcontent変数に格納され、画像のアップロード時はhandleImageAdded関数が呼び出される-->
      <vue-editor
        id="editor"
        v-model="content"
        use-custom-image-handler
        @image-added="handleImageAdded"
        :editorToolbar="customToolbar"
        placeholder="記事の本文はこちら..."
      />
    </client-only>
    <br /><br />
    <!--プレビュー用のダイアログ-->
    <v-dialog v-model="previewdialog" width="80vw">
      <ArticleDetail :articles="articledata" />
    </v-dialog>
    <br />
  </div>
</template>
<script>
import ArticleDetail from "./ArticleDetail.vue";
import UploadImage from "./UploadImage.vue";
export default {
  components: { ArticleDetail, UploadImage },
  //記事の編集時は上位コンポーネント、この場合はpages/dashboard/edit/article/_id.vue、から引き渡されたデータをserverarticledata変数に格納
  props: ["serverarticledata"],
  data() {
    return {
      required: value => !!value || "この項目は必須です", // 入力必須の制約
      previewdialog: false,
      title: "",
      picture: 1,
      pictureurl:
        "https://storage.googleapis.com/fileloc/shibuya-2328029_1920.jpg",
      short_description: "",
      //tagsraw: "",
      content: "",
      category: 1,
      project: null,
      avaprojects: [],
      isValid: false,
      //プレビュー用のテンプレートのデータ。これを適時書き換える。
      articledata: {
        preview: true,
        pictureurl:
          "https://storage.googleapis.com/fileloc/shibuya-2328029_1920.jpg",
        title: "",
        short_description: "",
        content: "",
        category: "",
        project: null,
        picture: 1
      },
      //以下エディタの設定用
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["clean"]
      ],
      avacategories: [
        {
          name: "テストカテゴリ",
          id: 1
        }
      ]
    };
  },
  methods: {
    /*初回ロード(APIサーバーからserverarticledataをダウンロードした際)時にエディタにそれらを反映させる関数*/
    loadarticledata(serverarticledata) {
      if (serverarticledata) {
        //content, title, tagsraw,short_description (内部のプロジェクトデータ管理用の変数)をそれぞれserverarticledata (サーバーから取得したarticledata)の値に変更
        this.short_description = serverarticledata.short_description;
        this.content = serverarticledata.content;
        this.title = serverarticledata.title;
        this.category = serverarticledata.category;
        this.pictureurl =
          serverarticledata.picture.url ||
          "https://storage.googleapis.com/fileloc/shibuya-2328029_1920.jpg";
        this.picture = serverarticledata.picture.id || 1;
        this.project = serverarticledata.project.id || null;
        //joinを使っているとserverarticledataがundefinedなときにエラーになるのでifでserverarticledataが存在するときのみ実行

        //タグ機能を一時的に無効中のため
        //this.tagsraw = this.tagstolist(serverarticledata.tags);
      }
    },
    //エディタに画像が追加された際に発火
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      this.$toast.info("画像をアップロード中です...").goAway(16000);
      //formDataオブジェクトを生成
      const formData = new FormData();
      formData.append("files", file);
      //アップロード
      const response = await this.$strapi.$http
        .$post("/upload", formData)
        .catch(error => {
          return error.response;
        });
      let url = response[0].url; // Get url from response
      //エディタに挿入
      Editor.insertEmbed(cursorLocation, "image", url);
      this.$toast.success("画像をアップロードしました!").goAway(3000);
      resetUploader();
    },
    //サムネイル画像が設定された際にトリガーされる関数
    setImage(response) {
      console.log("SETIMAGE");
      //画像のURLを設定
      this.pictureurl = response[0].url;
      //画像のIDを設定。IDさえ設定すればあとは勝手にサーバー側で色々やってくれる。
      this.picture = response[0].id;
      console.log(this.picture);
    },
    //tagsオブジェクトをlist形式に変換するやつ
    tagstolist(tags) {
      var tagslist = [];
      for (var key in tags) {
        var tag = tags[key];
        tagslist.push(tag.name);
      }
      return tagslist;
    },
    //現在存在しているカテゴリ一覧を取得
    async getavacategories() {
      this.avacategories = await this.$strapi.find("categories");
    },
    //現在ユーザーが所属しているプロジェクト一覧を取得
    async getuserprojects() {
      var user = await this.$strapi.findOne("users", this.$strapi.user.id);
      this.avaprojects = user.joiningprojects;
      console.log(this.avaprojects);
    }
  },
  //ページがロードされた際に実行される変数。
  activated() {
    this.getavacategories();
    this.getuserprojects();
  },
  watch: {
    /*エディタのcontentを監視*/
    //contentが変わったらarticledataの本文に反映
    content: {
      immediate: true,
      handler(value) {
        this.articledata.content = value;
      }
    },
    /*エディタのtitleを監視*/
    title: {
      immediate: true,
      handler(value) {
        //contentが変わったらarticledataのタイトルに反映
        this.articledata.title = value;
      }
    },
    /*エディタのpicture(サムネイル)の変更を監視*/
    picture: {
      immediate: true,
      handler(value) {
        //contentが変わったらarticledataのタイトルに反映
        this.articledata.picture = value;
      }
    },
    /*エディタのtagsraw要素を監視*/
    /*tagsraw: {
      immediate: true,
      handler(value) {
        //スペース区切りのタグをリスト形式に変換
        //const tagsplited = value.split(" ");
        this.articledata.tags = value;
      }
    },*/
    //short_descriptionが変わったらarticledataの本文に反映
    short_description: {
      immediate: true,
      handler(value) {
        //プロジェクトのメインコンテンツ
        this.articledata.short_description = value;
      }
    },
    //category変数が変わったらarticledataの本文にも反映
    category: {
      immediate: true,
      handler(value) {
        console.log("CATEGORY CHANGE", value);
        //categoryにカテゴリのIDを設定
        if (value.id && this.articledata) {
          this.articledata.category = value.id;
        } else {
          this.articledata.category = 1;
        }
      }
    },
    //project変数が変更された場合articledataにも反映
    project: {
      immediate: true,
      handler(value) {
        if (value && this.articledata) {
          //記事の属するプロジェクトID
          this.articledata.project = value.id;
        } else {
          this.articledata.project = 1;
        }
      }
    },
    serverarticledata: {
      immediate: true,
      handler(value) {
        //loadarticledataにserverarticledataを渡す
        this.loadarticledata(value);
      }
    }
  }
};
</script>
