<template>
  <div class="center">
    <h2 class="centerh2" style="padding-top: 32px;">
      {{ categoryinfo.name }} カテゴリ
    </h2>
    <v-tabs v-model="tab">
      <v-tab href="#users">Users</v-tab>
      <v-tab href="#articles">Articles</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="users">
        <ListUsers :users="categoryinfo.users" />
      </v-tab-item>
      <v-tab-item value="articles">
        <ListArticles :articles="categoryinfo.articles" />
      </v-tab-item>
    </v-tabs-items>
    <!--エラー時のアラート用-->
    <!--    <v-snackbar v-model="iserror" timeout="60000">
      Error occurred while retrieving information from server. Please try again.
    </v-snackbar>-->
  </div>
</template>

<script>
import ListArticles from "~/components/ListArticles.vue";

export default {
  components: {
    ListArticles
  },
  data() {
    return {
      showcalendar: false,
      projects: "",
      categoryinfo: "",
      tab: "projects"
    };
  },
  methods: {
    async getCategory(id) {
      var pts = await this.$strapi.findOne("categories", id);

      this.categoryinfo = pts;
    }
  },
  //activated()がある場合はmountedはいらないけど万が一keep-aliveを消すことになったときに面倒なので一応残しておく
  async mounted() {
    this.getCategory(this.$route.params.id);
  },
  //このコンポーネントが有効(表示)になったら実行される, keep-alive(キャッシュ)利用時ではmounted()と同じ挙動をする keep-aliveによってキャッシュされた内容の更新用
  activated() {
    //ページが表示状態になったらユーザー詳細を取得/更新
    this.getCategory(this.$route.params.id);
  },
  head() {
    return {
      title: this.categoryinfo.name + " - ",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>
