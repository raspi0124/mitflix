<!--右上にあるDashboardとかにいくメニューのコンポーネント-->
<template>
  <v-container style="background-color: rgba(0,0,0,.5);" color="rgba(0,0,0,.5">
    <v-menu bottom min-width="200px" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn x-large :ripple="false" v-on="on" plain>
          <v-avatar tile size="32" color="blue">
            <img :src="avaterimg" alt="ICONOPEN" />
          </v-avatar>
        </v-btn>
      </template>
      <v-card rounded>
        <v-list-item-content
          class="justify-center"
          style="background-color: rgba(0,0,0,.5);"
          color="rgba(0,0,0,.5"
        >
          <div class="mx-auto text-center">
            <v-avatar tile color="blue">
              <img :src="avaterimg" alt="ICONOPEN" />
            </v-avatar>
            <h3>{{ fullName }}</h3>
            <p class="caption mt-1">
              {{ email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed text @click="logout">
              Logout
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-container>
</template>
<script>
export default {
  methods: {
    async logout() {
      await this.$strapi.logout();
      await this.$strapi.clearToken();
      window.location.href = "/logouted";
      //window.location.href = "https://mitalink.jp.auth0.com/v2/logout";
    }
  },
  //ユーザー情報が来なかった場合のフォールバック
  props: {
    userimageurl: {
      default: "https://storage.googleapis.com/fileloc/shibuya-2328029_1920.jpg"
    },
    fullName: {
      default: "MITALINK USER"
    },
    email: {
      default: "mitalink@mita-is.ed.jp"
    },
    avater: {
      default: {
        formats: {
          thumbnail: {
            url:
              "https://storage.googleapis.com/mitapro/icon_412338ca4b/icon_412338ca4b.png"
          }
        }
      }
    }
  },
  computed: {
    avaterimg() {
      //アバターが存在すれば
      if (this.avater) {
        return this.avater.formats.thumbnail.url;
      } else {
        return "https://storage.googleapis.com/mitapro/icon_412338ca4b/icon_412338ca4b.png";
      }
    }
  }
};
</script>
