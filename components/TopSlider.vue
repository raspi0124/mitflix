<!--ホーム画面のスライダー用コンポーネント-->
<template>
  <v-carousel
    cycle
    hide-delimiter-background
    class="rounded"
    height="400"
    v-if="slides"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      :src="slide.background.url"
      :to="slide.link"
    >
      <v-row class="fill-height" align="center" justify="center">
        <div class="display-2 white--text shadowtext">
          {{ slide.heading }}
        </div></v-row
      ></v-carousel-item
    >
  </v-carousel>
</template>
<script>
export default {
  data() {
    return {
      slides: {}
    };
  },
  methods: {
    async getSlides() {
      //ここでスライド一覧のjsonを取得
      this.slides = await this.$strapi.find("slides");
    }
  },
  activated() {
    this.getSlides();
  }
};
</script>
