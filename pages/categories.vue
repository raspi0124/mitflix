<template>
  <div>
    <div class="center">
      <h2 class="centerh2" style="padding-top: 32px; display:inline-block;">
        Categories
      </h2>
    </div>
    <TopCategories />
  </div>
</template>

<script>
import ListArticles from "~/components/ListArticles.vue";
import HeaderCreateBtn from "~/components/HeaderCreateBtn.vue";
import TopCategories from "~/components/TopCategories.vue";

export default {
  components: {
    ListArticles,
    HeaderCreateBtn,
    TopCategories
  },
  head() {
    return {
      title: "Categories",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>
