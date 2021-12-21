<template>
  <v-app>
    <v-row justify="center" width="100vw">
      <v-col width="100vw" class="center">
        <h2 class="centerh2">ユーザーを編集</h2>
        <v-tabs v-model="tab" class="center">
          <v-tab href="#user">プロフィールを編集</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item value="user">
            <!--エディタのコンポーネントを表示-->
            <ProfileEditor
              ref="ProfileEditorComponent"
              :serveruserdata="serveruserdata"
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
            href="/user/me"
            target="_blank"
            >ユーザーを見る
          </v-btn>
          <v-btn
            class="white--text sidebtn"
            depressed
            large
            :loading="publishaction"
            :disabled="publishaction"
            @click="publishit()"
            >ユーザーを更新する
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="draftsaveaction" timeout="3000">
      下書きを保存しました!
    </v-snackbar>
    <v-snackbar v-model="published" timeout="3000">
      ユーザーを更新しました!
    </v-snackbar>
  </v-app>
</template>

<script>
import ProfileEditor from "~/components/ProfileEditor.vue";
import { emojiremove } from "~/assets/emojiremover.js";

export default {
  layout: "dashboard",
  components: {
    ProfileEditor
  },
  data() {
    return {
      id: this.$strapi.user.id,
      serveruserdata: "",
      loader: null,
      draftsaveaction: false,
      publishaction: false,
      published: false,
      iserror: false,
      notAuthor: false,
      tab: "user"
    };
  },
  methods: {
    //ここでProfileEditorComponentのpreviewdialogをtrueに設定してプレビューを表示
    togglePreview() {
      this.$refs.ProfileEditorComponent.previewdialog = true;
      //console.log(this.$refs.ProfileEditorComponent.content);
    },
    //ユーザーを$strapi経由でapiから取得
    async getUser(id) {
      var pts = await this.$strapi.findOne("users", id);
      //this.usersに取得した内容を代入
      this.serveruserdata = pts;
    },
    async publishit() {
      this.loader = "publishaction";
      var currentuserdata = this.$refs.ProfileEditorComponent.userdata;
      delete currentuserdata.ownername;
      delete currentuserdata.preview;
      delete currentuserdata.pictureurl;
      if (this.isValid()) {
        console.log("BEFOREEMOJIREMOVE", currentuserdata);
        var afteremrm = emojiremove(currentuserdata);
        console.log("AFTEREMOJIREMOVE", afteremrm);
        await this.$strapi.update("users", this.id, afteremrm);
        this.published = true;
        this.$toast.success("ユーザーを公開しました").goAway(3000);
      } else {
        this.$toast.error("すべての項目を埋めてください").goAway(16000);
      }
      this["publishaction"] = false;
      this.loader = null;
    },
    isValid() {
      if (this.$refs.ProfileEditorComponent) {
        return (
          this.$refs.ProfileEditorComponent.isValid &&
          this.$refs.ProfileEditorComponent.content !== ""
        );
      } else {
        return false;
      }
    }
  },
  async mounted() {
    this.getUser(this.id);
  },
  async activated() {
    this.getUser(this.id);
  },
  head() {
    return {
      title: "ユーザー編集",
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
