<template>
  <v-app>
    <v-row justify="center" width="100vw">
      <v-col width="100vw" class="center">
        <h2 class="centerh2">記事を編集</h2>
        <v-tabs v-model="tab" class="center">
          <v-tab href="#article">記事を編集</v-tab>
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
          <v-btn
            class="white--text sidebtn"
            depressed
            large
            :href="'/article/' + this.id"
            target="_blank"
            >記事を見る
          </v-btn>
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
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="white--text sidebtndanger"
                depressed
                large
                :loading="deleteaction"
                :disabled="deleteaction"
                v-bind="attrs"
                v-on="on"
                >記事を削除する
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                記事の削除
              </v-card-title>

              <v-card-text>
                一度削除した場合基本的に復活させることはできません。本当に削除しますか?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="deleteit()">
                  記事を削除する
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
    <!--作者ではないユーザーがアクセスしている際のエラー-->
    <v-dialog v-model="notAuthor" persistent max-width="50vw">
      <v-card>
        <v-card-title class="headline">
          Wrong Account?
        </v-card-title>
        <v-card-text>
          この記事を編集する権限をお持ちではないようです。<br />
          This incident will be reported.
          <div style="color:white;">
            *もし意図的にアクセスした場合:
            不正アクセスの試みはやめようね!()(もし脆弱性を見つけたら運営の誰かに教えていただけると大変ありがたいのでその時はよろしくお願いしますm(__)m<br />
            もし意図的ではなかったらすみません...
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      notAuthor: false,
      tab: "article"
    };
  },
  activated() {
    this.getArticle(this.id);
  },
  methods: {
    //ここでArticleEditorComponentのpreviewdialogをtrueに設定してプレビューを表示
    togglePreview() {
      this.$refs.ArticleEditorComponent.previewdialog = true;
      //console.log(this.$refs.ArticleEditorComponent.content);
    },
    //記事をStrapi経由でapiから取得
    async getArticle(id) {
      var pts = await this.$strapi.findOne("articles", id);
      //this.articlesに取得した内容を代入
      this.serverarticledata = pts;
      this.checkPermission();
    },
    async deleteit() {
      alert(
        "OK/閉じるを押すと記事が削除されます。間違って押してしまった場合は即座にタブを閉じてください。"
      );
      await this.$strapi.delete("articles", this.id);
      this.$toast.success("記事を正常に削除しました").goAway(3000);
      this.$router.push("/dashboard/articles");
    },
    checkPermission() {
      if (this.serverarticledata.author.id !== this.$strapi.user.id) {
        this.notAuthor = true;
        //運営にSentry経由で通知
        this.$sentry.captureException(
          new Error("checkPermission Error on article Edit Page")
        );
      }
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
        await this.$strapi.update("articles", this.id, afteremrm);
        this.published = true;
        this.$toast.success("記事を公開しました!").goAway(3000);
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
