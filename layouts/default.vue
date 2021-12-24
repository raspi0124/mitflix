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
      <nuxt-link
        to="/"
        tag="span"
        style="cursor: pointer; font-size: 24px; margin-left:8px;margin-right:8px;"
      >
        <v-img
          src="https://storage.googleapis.com/mitapro/logo_yoko_cropped_inverted_removebg_bb6bac7d40/logo_yoko_cropped_inverted_removebg_bb6bac7d40.png"
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
          style="margin-right:5px;"
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
          style="margin-right:-16px; background-color: transparent;"
          :fullName="
            this.$strapi.user.displayname || this.$strapi.user.username
          "
          :email="this.$strapi.user.email"
          :avater="this.$strapi.user.avater"
        />
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <!--pages以下の内容を表示 keep-aliveで直近16ページ分までキャッシュ-->
      <nuxt keep-alive :keep-alive-props="{ max: 16 }" />
    </v-main>
    <v-footer absolute app>
      <nuxt-link to="/about" style="color:white;">About</nuxt-link>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        👨‍✈️🛫📽 by Shoya.M, ✍️🛠️ by Junsei.M
      </div>
      <div class="pl-3">
        <span>&copy;MITAPro, PCClub {{ new Date().getFullYear() }}</span>
      </div>
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
      appTitle: "MiFilm",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/", icon: "mdi-home" },
        { title: "Film", path: "/category/1", icon: "mdi-movie-open" },
        {
          title: "Short",
          path: "/category/2",
          icon: "mdi-video-vintage"
        }
      ],
      is_transparent: "black"
    };
  },
  activated() {
    //Middlewareが上手くいかなかったのでとりあえずこっちサイドで対応 後で直す
    if (!this.$strapi.user) {
      window.location.href = "/publictop";
    }
  },
  mounted() {
    //Middlewareが上手くいかなかったのでとりあえずこっちサイドで対応 後で直す
    if (!this.$strapi.user) {
      window.location.href = "/publictop";
    }
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
