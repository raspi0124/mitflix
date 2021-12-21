<template>
  <v-app>
    <v-row justify="center" width="100vw">
      <v-col width="100vw" class="center">
        <h2 class="centerh2">新規記事</h2>
        <v-tabs v-model="tab" class="center">
          <v-tab href="#article">コンテンツ</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item value="article">
            <!--エディタのコンポーネントを表示-->
            <articleeditor
              ref="ArticleEditorComponent"
              :serverarticledata="serverarticledata"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
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
          <!--ボタンが押されたらtogglePreview関数を実行-->
          <v-btn
            class="white--text sidebtn"
            depressed
            large
            @click="togglePreview"
            >記事をプレビューする
          </v-btn>
          <v-btn
            class="white--text sidebtn"
            depressed
            large
            :loading="draftsaveaction"
            :disabled="draftsaveaction || true"
            @click="loader = 'draftsaveaction'"
            >記事を下書き保存する
          </v-btn>
          <v-btn
            class="white--text sidebtn"
            depressed
            large
            :loading="publishaction"
            :disabled="publishaction"
            @click="publishit()"
            >記事を公開する
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="draftsaveaction" timeout="3000">
      下書きを保存しました!
    </v-snackbar>
    <v-snackbar v-model="published" timeout="3000">
      記事を公開しました!
    </v-snackbar>
  </v-app>
</template>

<script>
import articleeditor from "~/components/ArticleEditor.vue";
import { emojiremove } from "~/assets/emojiremover.js";

export default {
  layout: "dashboard",
  components: {
    articleeditor
  },
  data() {
    return {
      id: this.$route.params.id,
      serverarticledata: "",
      loader: null,
      draftsaveaction: false,
      publishaction: false,
      published: false,
      iserror: false,
      tab: "article"
    };
  },
  methods: {
    //ここでArticleEditorComponentのpreviewdialogをtrueに設定してプレビューを表示
    togglePreview() {
      this.$refs.ArticleEditorComponent.previewdialog = true;
      //console.log(this.$refs.ArticleEditorComponent.content);
    },
    async publishit() {
      this.loader = "publishaction";
      var currentarticledata = this.$refs.ArticleEditorComponent.articledata;
      delete currentarticledata.preview;
      delete currentarticledata.pictureurl;
      if (this.isValid()) {
        console.log("BEFOREEMOJIREMOVE", currentarticledata);
        var afteremrm = emojiremove(currentarticledata);
        console.log("AFTEREMOJIREMOVE", afteremrm);
        await this.$strapi.create("articles", afteremrm);
        this.published = true;
        this.$router.push("/dashboard/articles");
      } else {
        this.$toast.error("すべての項目を埋めてください").goAway(16000);
      }
      this["publishaction"] = false;
      this.loader = null;
    },
    isValid() {
      if (this.$refs.ArticleEditorComponent) {
        return (
          this.$refs.ArticleEditorComponent.isValid &&
          this.$refs.ArticleEditorComponent.content !== ""
        );
      } else {
        return false;
      }
    }
  },
  head() {
    return {
      title: "記事追加",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
    }
  }
};
</script>
