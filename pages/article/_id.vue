<template>
  <div>
    <ArticleDetail :articles="articles" />
    <!--エラー時のアラート用-->
    <v-snackbar v-model="iserror" timeout="60000">
      Error occurred while retrieving information from server. Please try again.
    </v-snackbar>
  </div>
</template>

<script>
import ArticleDetail from "~/components/ArticleDetail.vue";

export default {
  components: {
    ArticleDetail
  },
  data() {
    return {
      id: this.$route.params.id,
      articles: "",
      loader: null,
      joinloading: false,
      followloading: false,
      iserror: false
    };
  },
  methods: {
    setArticle: function(detail) {
      if (detail.status !== 200) {
        this.iserror = true;
      } else {
        this.articles = detail.data;
      }
    },
    async getArticle(id) {
      var pts = await this.$strapi.findOne("articles", id);
      this.articles = pts;
    }
  },
  async mounted() {
    this.getArticle(this.$route.params.id);
  },
  head() {
    return {
      title: this.articles.title + " - 記事詳細",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>
