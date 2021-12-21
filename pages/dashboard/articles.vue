<template>
  <div class="container">
    <!--もしプロジェクトが存在、つまりapiから取得できていたら-->
    <div v-if="articles">
      <v-card>
        <v-card-title>
          Articles
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="articles" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              small
              depressed
              color="primary"
              class="mr-2"
              :to="editlink + item.id"
            >
              編集
            </v-btn>
          </template>
          <template v-slot:[`item.public`]="{ item }">
            <v-simple-checkbox
              v-model="item.public"
              disabled
            ></v-simple-checkbox> </template
        ></v-data-table>
      </v-card>
    </div>
    <div v-else>
      <v-skeleton-loader
        width="80vw"
        height="100vh"
        type="table"
      ></v-skeleton-loader>
    </div>
    <!--エラー時のアラート用-->
    <v-snackbar v-model="iserror" timeout="60000">
      Error occured while retrieving information from server. Please try again.
    </v-snackbar>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      iserror: false,
      search: "",
      editlink: "edit/article/",
      headers: [
        {
          text: "プロジェクト名",
          align: "start",
          sortable: true,
          value: "title"
        },
        //{ text: "公開済み", value: "public" },
        //{ text: "オーナー", value: "author.email" },
        { text: "About", value: "short_description", sortable: false },
        //{ text: "カテゴリ", value: "category.name" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      articles: ""
    };
  },
  methods: {
    async getarticles() {
      var pts = await this.$strapi.findOne("users", this.$strapi.user.id);
      this.articles = pts.articles;
    }
  },
  async mounted() {
    this.getarticles();
  },
  async activated() {
    //TODO APIのアクセス先をサーバーサイド実装次第変更
    this.getarticles();
  }
};
</script>
