<template>
  <div>
    <div class="center">
      <h2 class="centerh2" style="padding-top: 32px; display:inline-block;">
        記事一覧
      </h2>
      <span v-if="$strapi.user"><HeaderCreateBtn /></span>
    </div>
    <ListArticles :articles="articles" />
  </div>
</template>

<script>
import ListArticles from "~/components/ListArticles.vue";
import HeaderCreateBtn from "~/components/HeaderCreateBtn.vue";

export default {
  components: {
    ListArticles,
    HeaderCreateBtn
  },
  head() {
    return {
      title: "Articles",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  },
  data() {
    return {
      articles: ""
    };
  },
  methods: {
    async getArticles() {
      var pts = await this.$strapi.find("articles");
      this.articles = pts;
    }
  },
  //このコンポーネントが有効(表示)になったら実行される, keep-alive(キャッシュ)利用時ではmounted()と同じ挙動をする keep-aliveによってキャッシュされた内容の更新用
  activated() {
    //ページが表示状態になったら記事一覧を取得/更新
    this.getArticles();
  }
};
</script>
