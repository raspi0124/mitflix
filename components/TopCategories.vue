<!--トップページに乗っているカテゴリ一覧表示用のコンポーネント-->
<template>
  <div>
    <v-card shaped width="100vw" class="rounded-card mx-auto mt-5 center">
      <v-card-title><h2>カテゴリ一覧</h2></v-card-title>
      <div>
        <span v-for="category in avacategories" :key="category.id">
          <v-btn
            style="margin: 32px; color:white;"
            class="shadowtext"
            :to="'/category/' + category.id"
            x-large
            :color="category.color"
          >
            {{ category.name }}
          </v-btn>
        </span>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      avacategories: null
    };
  },
  activated() {
    this.getavacategories();
  },
  methods: {
    async getavacategories() {
      this.avacategories = await this.$strapi.find("categories");
    }
  }
};
</script>
