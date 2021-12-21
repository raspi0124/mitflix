<!--プロフィール編集用コンポーネント-->
<template>
  <div class="container text-left">
    <client-only>
      <v-form v-model="isValid" lazy-validation>
        <v-text-field
          label="ニックネーム"
          filled
          :rules="[required]"
          v-model="displayname"
        ></v-text-field>
        <span class="text-center" style="color: gray;">アバター画像</span>
        <UploadImage @setImage="setImage" />
        <v-select
          :items="avacategories"
          label="タイプ/カテゴリ"
          v-model="category"
          item-text="name"
          item-value="id"
          :rules="[required]"
          return-object
          outlined
        ></v-select>
        <span style="color: gray;">
          Wondering your type/category? Click
          <nuxt-link to="/shindan">here</nuxt-link> to have a quick diagnosis!
        </span>
        <vue-editor
          id="editor"
          v-model="introduction"
          use-custom-image-handler
          @image-added="handleImageAdded"
          :editorToolbar="customToolbar"
          placeholder="自己紹介をこちらにどうぞ!"
        />
      </v-form>
    </client-only>
    <br />
  </div>
</template>
<script>
import UploadImage from "./UploadImage.vue";
export default {
  components: { UploadImage },
  props: ["serveruserdata"],
  data() {
    return {
      required: value => !!value || "この項目は必須です", // 入力必須の制約
      displayname: "",
      avater: 1,
      avaterurl:
        "https://storage.googleapis.com/fileloc/shibuya-2328029_1920.jpg",
      //tagsraw: "",
      introduction: "",
      category: 1,
      isValid: false,
      avacategories: [
        {
          name: "テストカテゴリ",
          id: 1
        }
      ],
      //プレビュー用のテンプレートのデータ。これを適時書き換える。
      userdata: {
        displayname: "",
        introduction: "",
        category: "",
        avater: ""
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
      ]
    };
  },
  methods: {
    /*初回ロード(APIサーバーからserveruserdataをダウンロードした際)時にエディタにそれらを反映させる関数*/
    loaduserdata(serveruserdata) {
      if (serveruserdata) {
        //content, title, tagsraw,short_description (内部のプロジェクトデータ管理用の変数)をそれぞれserveruserdata (サーバーから取得したuserdata)の値に変更
        this.displayname = serveruserdata.displayname;
        this.introduction = serveruserdata.introduction;
        this.category = serveruserdata.category;
        this.avater = serveruserdata.avater.id || 1;
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
      //画像のIDを設定。IDさえ設定すればあとは勝手にサーバー側で色々やってくれる。
      this.avater = response[0].id;
    },
    //現在存在しているカテゴリ一覧を取得
    async getavacategories() {
      this.avacategories = await this.$strapi.find("categories");
    }
  },
  activated() {
    this.getavacategories();
  },
  watch: {
    /*エディタのintroductionを監視*/
    //introductionが変わったらuserdataの本文に反映
    introduction: {
      immediate: true,
      handler(value) {
        //プロジェクトのメインコンテンツ
        this.userdata.introduction = value;
      }
    },
    /*エディタのdisplaynameを監視*/
    displayname: {
      immediate: true,
      handler(value) {
        //displaynameが変わったらuserdataのタイトルに反映
        this.userdata.displayname = value;
      }
    },
    /*エディタのavater(サムネイル)の変更を監視*/
    avater: {
      immediate: true,
      handler(value) {
        //contentが変わったらuserdataのタイトルに反映
        this.userdata.avater = value;
      }
    },
    //categoryが変わったらuserdataの本文に反映
    category: {
      immediate: true,
      handler(value) {
        console.log("CATEGORY CHANGE", value);
        //categoryにカテゴリのIDを設定
        if (value.id && this.userdata) {
          this.userdata.category = value.id;
        } else {
          this.userdata.category = 1;
        }
      }
    },
    serveruserdata: {
      immediate: true,
      handler(value) {
        //loaduserdataにserveruserdataを渡す
        this.loaduserdata(value);
      }
    }
  }
};
</script>
