<!--ユーザー詳細ページ用のコンポーネント-->
<template>
  <v-app>
    <v-row justify="center" width="100vw">
      <v-col width="100vw">
        <v-card width="100vw" v-if="users">
          <v-img
            class="white--text align-end"
            height="400px"
            src="https://storage.googleapis.com/fileloc/shibuya-2328029_1920.jpg"
          >
            <div
              style="display: flex; align-items: center; margin-bottom: 140px; margin-left:3vw;"
            >
              <LargeMemberIcon
                style="margin-right:16px"
                :avater="users.avater"
              />
              <h1
                class="shadowtext"
                style="font-size: 40px;font-weight: normal;"
              >
                {{ users.displayname || users.username }}
              </h1>
              <v-spacer />
              <v-btn
                v-if="isown"
                class="sidebtn white--text"
                style="margin-right:3vw"
                depressed
                width="16%"
                to="/dashboard/edit/profile"
                >編集する
              </v-btn>
            </div>
          </v-img>
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
              <h2 class="noncenterh2">自己紹介</h2>
              <v-card-text class="text--primary" style="padding-top:20px;">
                <div
                  style="padding-top:20px; padding-bottom:20px;"
                  v-html="$sanitize(users.introduction)"
                ></div>
                <!--↑の$sanitizeは悪意のあるscriptを含んだimgタグ等を無効化しているため
                消す意味を十分以上に理解したうえで消すこと-->
              </v-card-text>
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
                <div
                  style="display: flex; justify-content: center; align-items: center;margin-bottom:2px; text-align:center"
                >
                  <div v-if="users.category && users.category.name">
                    <v-btn
                      style="margin-left: 0;"
                      depressed
                      small
                      color="accent"
                      :to="'/category/' + users.category.id"
                      >{{ users.category.name }}</v-btn
                    >
                  </div>
                </div>
                <h3 class="noncenterh2">Email</h3>
                {{ users.email }}<br />
                <!--プロジェクトがプレビュー状態でなければ-->
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <!--ローディング中のプレースホルダ-->
        <v-skeleton-loader
          width="71vw"
          type="card, user, list-item, list-item-avater"
          v-else
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      loader: null,
      joinloading: false,
      followloading: false
    };
  },
  props: ["users"],
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  computed: {
    isown() {
      if (this.$strapi.user) {
        if (this.users.id == this.$strapi.user.id || this.users.id == "me") {
          return true;
        }
        return false;
      } else {
        return false;
      }
    }
  }
};
</script>
