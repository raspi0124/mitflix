<template>
  <v-app>
    <v-app-bar app>
      <!--  <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
-->
      <nuxt-link to="/" tag="span" style="cursor: pointer; font-size: 24px">
        <v-img
          src="/logo-yoko-cropped-inverted-removebg.png"
          style="height:32px;width:150px; margin-right:10px;"
          alt="MITAPro映画祭"
        />
      </nuxt-link>
      <v-spacer></v-spacer>
      <!--アバターメニューは常時表示にするためclassなしのところへ-->
      <!--ログインしているときのみmb-4クラスを適用。最初はAvaterMenu上位のdivにclassを設定しようとしたが動かなかったため-->
      <v-toolbar-items :class="{ 'mb-4': $strapi.user }">
        <!--もしログインしていなければログインボタンを表示-->
        <v-btn
          v-if="!this.$strapi.user"
          color="#383838"
          depressed
          @click="loginWithStrapi"
          >Login</v-btn
        >
        <AvaterMenu
          v-else
          :fullName="
            this.$strapi.user.displayname || this.$strapi.user.username
          "
          :email="this.$strapi.user.email"
          :avater="this.$strapi.user.avater"
        />
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <!--pages以下の内容を表示 keep-aliveで直近16ページ分までキャッシュ-->
        <nuxt keep-alive :keep-alive-props="{ max: 16 }" />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app>
      <a
        style="margin-right:8px;"
        href="https://status.mitapro.jp/"
        target="_blank"
        rel="noopener noreferrer"
        >Status</a
      >
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfgDS5zcyjNDWttNNPUgzzuU1fwrohHaMVegxhY9GH5YHJt3w/formResponse"
        target="_blank"
        rel="noopener noreferrer"
        >Feedback/Report Bug</a
      >

      <v-spacer></v-spacer
      ><span>&copy; MITAPro {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AvaterMenu from "~/components/AvaterMenu.vue";

export default {
  components: { AvaterMenu },
  data() {
    return {
      appTitle: "MiFilm",
      sidebar: false
    };
  },

  methods: {
    loginWithStrapi: function() {
      window.location = this.$config.STRAPI_URL + "connect/auth0";
    },
    //デバッグ用
    logit() {
      //  console.log(this.$auth.user.picture);
    }
  }
};
</script>
