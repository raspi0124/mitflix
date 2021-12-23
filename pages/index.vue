`<template>
  <div>
    <TopSlider />
    <VideoSwiper headlineTitle="Tekitou" :videos="allvideos" />
    <VideoSwiper headlineTitle="Tekitou2" :videos="allvideos" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      lighthousealert: false,
      allvideos: ""
    };
  },
  mounted() {
    this.getFilms();
    //console.log(process.env.currentenv);
  },
  methods: {
    detectlighthouse() {
      if (window.navigator.userAgent.toLowerCase().includes("lighthouse")) {
        alert(
          "パフォーマンス無視で速度優先で実装してるのでLighthouseのスコアは遅いですがひと段落ついた時に高速化しますはい..."
        );
        console.log(
          "パフォーマンス無視で速度優先で実装してるのでLighthouseのスコアは遅いですがひと段落ついた時に高速化しますはい..."
        );
        this.lighthousealert = true;
      }
    },
    async getFilms() {
      var pts = await this.$strapi.find("videos");
      this.allvideos = pts;
    }
  },
  head() {
    return {
      title: "Home",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>
