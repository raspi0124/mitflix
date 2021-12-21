<template>
  <v-app>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="sidebar"
      right
      app
    >
      <!--モバイル用のハンバーガーメニューの内容-->
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app style="background-color: rgba(0,0,0,.5);">
      <nuxt-link to="/" tag="span" style="cursor: pointer; font-size: 24px;">
        <v-img
          src="/logo-yoko-cropped-inverted-removebg.png"
          style="height:32px;width:150px; margin-right:10px;"
          alt="MITAPro映画祭"
        />
      </nuxt-link>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          small
          text
          plain
          :ripple="false"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <!--アバターメニューは常時表示にするためclassなしのところへ-->
      <!--ログインしているときのみmb-4クラスを適用。最初はAvaterMenu上位のdivにclassを設定しようとしたが動かなかったため-->
      <v-toolbar-items :class="{ 'mb-4': $strapi.user }">
        <!--もしログインしていなければログインボタンを表示-->
        <v-btn
          v-if="!this.$strapi.user"
          type="primary"
          color="primary"
          depressed
          @click="loginWithStrapi"
          >Login</v-btn
        >
        <AvaterMenu
          v-else
          style="margin-right:-16px;"
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
      <div>&copy; MITAPro {{ new Date().getFullYear() }}</div>
    </v-footer>
    <v-bottom-navigation app class="hidden-sm-and-up">
      <!-- ボトムナビゲーション -->
      <v-btn v-for="menu in menuItems" :key="menu.title" :to="menu.path">
        <span>{{ menu.title }}</span>
        <v-icon>{{ menu.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import AvaterMenu from "~/components/AvaterMenu.vue";

export default {
  components: { AvaterMenu },
  data() {
    return {
      appTitle: "MITAPro",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/", icon: "mdi-home" },
        { title: "Articles", path: "/articles", icon: "mdi-post" },
        { title: "About", path: "/about", icon: "mdi-information" }
      ],
      is_transparent: "black"
    };
  },
  activated() {
    //Middlewareが上手くいかなかったのでとりあえずこっちサイドで対応 後で直す
    if (!this.$strapi.user) {
      window.location.href = "/publictop";
    }
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    loginWithStrapi: function() {
      window.location = this.$config.STRAPI_URL + "connect/auth0";
    },
    onScroll() {
      console.log("onScroll");
      var currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        this.is_transparent = "black";
        console.log("BLACK");
      } else {
        this.is_transparent = "transparent";
        console.log("TRANSPARENT");
      }
    },
    //デバッグ用
    logit() {
      //  console.log(this.$auth.user.picture);
    }
  }
};
</script>
