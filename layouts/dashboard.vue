<template>
  <v-app>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="sidebar"
      right
      app
    >
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
        <HeaderCreateBtn />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <!--  <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
-->
      <nuxt-link to="/" tag="span" style="cursor: pointer; font-size: 24px;">
        <v-img src="/newlogo.png" height="48px" width="48px" alt="MITAPro" />
        <!--<img
          class="mr-3"
          src="~/assets/resized_mitalink-yoko-forweblogo4.png"
          height="50px"
          width="125px"
          alt="MITAPro"
        />-->
      </nuxt-link>
      <v-toolbar-title style="padding-left:0.5vw;">Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          {{ item.title }}
        </v-btn>
        <HeaderCreateBtn />
      </v-toolbar-items>
      <!--アバターメニューは常時表示にするため上とは別のところへ-->
      <!--margin-bottomを4(16px)に設定-->
      <v-toolbar-items class="mb-4">
        <!--<AvaterMenu
          :userimageurl="this.$auth.user.picture"
          :fullName="this.$auth.user.name"
          :email="this.$auth.user.email"
        />-->
        <AvaterMenu
          style="margin-right:-16px;"
          :fullName="
            this.$strapi.user.displayname || this.$strapi.user.username
          "
          :email="this.$strapi.user.email"
          :avater="this.$strapi.user.avater"
        />
      </v-toolbar-items>
      <span class="betamark"> </span>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon
          @click="sidebar = !sidebar"
          aria-label="MENU TOGGLE"
        >
        </v-app-bar-nav-icon>
      </span>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt keep-alive :keep-alive-props="{ max: 16 }" />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app>
      <v-spacer></v-spacer>
      <span>&copy; MITAPro {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AvaterMenu from "~/components/AvaterMenu.vue";
import HeaderCreateBtn from "~/components/HeaderCreateBtn.vue";
export default {
  components: { AvaterMenu, HeaderCreateBtn },
  data() {
    return {
      sidebar: false,
      menuItems: [
        { title: "Top", path: "/dashboard/top" },
        { title: "Projects", path: "/dashboard/projects", icon: "pen" },
        { title: "Events", path: "/dashboard/events", icon: "pen" },
        { title: "Articles", path: "/dashboard/articles", icon: "pen" }
      ]
    };
  },
  mounted() {
    //Middlewareが上手くいかなかったのでとりあえずこっちサイドで対応 後で直す
    if (!this.$strapi.user) {
      window.location.href = "/publictop";
    }
  },
  activated() {
    //Middlewareが上手くいかなかったのでとりあえずこっちサイドで対応 後で直す
    if (!this.$strapi.user) {
      window.location.href = "/publictop";
    }
  },
  //middleware: "auth",
  head() {
    return {
      title: "Dashboard",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>
