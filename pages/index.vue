`<template>
  <div>
    <TopSlider />
    <VideoSwiper
      v-if="votedvideos"
      headlineTitle="My Votes"
      :videos="votedvideos"
    />
    <VideoSwiper headlineTitle="Tekitou" :videos="allvideos" />
    <VideoSwiper headlineTitle="Tekitou2" :videos="allvideos" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      lighthousealert: false,
      allvideos: "",
      votedvideos: ""
    };
  },
  mounted() {
    this.getFilms();
    this.getVoted();
    //console.log(process.env.currentenv);
  },
  activated() {
    this.getVoted();
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
    },
    async getVoted() {
      const user = await this.$strapi.findOne("users", this.$strapi.user.id);
      this.votedvideos = user.votedvideos;
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
