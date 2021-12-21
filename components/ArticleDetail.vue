<!--記事本体用のコンポーネント-->
<template>
  <v-app>
    <v-row justify="center" width="100vw">
      <v-col width="100vw">
        <v-card width="100vw" v-if="articles">
          <v-img class="white--text align-end" height="400px" :src="pictureurl">
            <div
              style="display: flex; justify-content: center; align-items: center;margin-bottom:0; text-align:center"
            >
              <!--カテゴリ表示-->
              <div v-if="articles.category && articles.category.name">
                <v-btn
                  style="margin-left: 0;"
                  depressed
                  small
                  :color="articles.category.color"
                  :to="'/category/' + articles.category.id"
                  >{{ articles.category.name }}</v-btn
                >
                <!--タグ一覧表示-->
                <div v-if="articles.tags && articles.tags.name">
                  <span
                    v-for="tag in articles.tags"
                    v-bind:key="tag.id"
                    class="shadowtext"
                  >
                    #{{ tag.name }} &nbsp;
                  </span>
                </div>
              </div>
            </div>
            <!--タイトル表示-->
            <div
              style="display: flex; justify-content: center; align-items: center;margin-bottom:140px; text-align:center"
            >
              <h1
                class="shadowtext"
                style="font-size: 40px;font-weight: normal;"
                v-if="articles.title"
              >
                {{ articles.title }}
              </h1>
            </div>
          </v-img>
          <!--左側カラム-->
          <v-row no-gutters>
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="9"
              lg="9"
              order="12"
              order-md="1"
              order-lg="1"
              order-xl="1"
            >
              <!--紹介文-->
              <v-card-text class="text--primary" style="padding-top:20px;">
                <div
                  style="padding-top:20px; padding-bottom:20px;"
                  v-html="$sanitize(articles.content)"
                ></div>
                <!--↑の$sanitizeは悪意のあるscriptを含んだimgタグ等を無効化しているため
                消す際は消す意味を十分以上に理解したうえで消すこと-->
              </v-card-text>
            </v-col>
            <!--右側カラム-->
            <v-col
              justify="center"
              cols="12"
              xs="12"
              sm="12"
              md="3"
              lg="3"
              order="1"
              order-md="12"
              order-lg="12"
              order-xl="12"
            >
              <v-card
                class="pa-2"
                outlined
                tile
                height="100%"
                color="#EAEAEA"
                align="center"
                style="margin-bottom:20px"
              >
                <!--記事作者の名前-->
                <MemberName
                  v-if="articles.author"
                  :membername="
                    articles.author.displayname || articles.author.username
                  "
                  :memberid="articles.author.id"
                  :isorg="articles.author.isorg"
                  :avater="articles.author.avater"
                />
                <!--この記事が紐づいているプロジェクトの名前-->
                <MemberName
                  v-if="articles.author && articles.project"
                  :membername="articles.project.projectname"
                  :memberid="articles.author.id"
                  isproject="true"
                  :avater="articles.project.picture"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <!--ローディング中のプレースホルダ-->
        <v-skeleton-loader
          width="71vw"
          type="card, article, list-item, list-item-avater"
          v-else
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import MemberName from "./MemberName.vue";

export default {
  components: {
    MemberName
  },
  data() {
    return {
      id: this.$route.params.id,
      //以下はすべてローディング(くるくる回るやつ)用の設定
      loader: null,
      joinloading: false,
      followloading: false
    };
  },
  //上位コンポーネント、この場合は/pages/article/_id.vue、からの情報等の引継ぎ。articles変数として保存。
  props: ["articles"],
  //ボタンのローダー用
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  computed: {
    //画像のURLが設定されていない場合のフォールバック用。pictureurlはプレビュー時、picture.urlは実稼働時、一番最後のはフォールバック用。
    pictureurl() {
      return (
        this.articles.pictureurl ||
        this.articles.picture.url ||
        "https://storage.googleapis.com/fileloc/shibuya-2328029_1920.jpg"
      );
    }
  }
};
</script>
