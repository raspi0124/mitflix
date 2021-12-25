`<template>
  <div>
    <TopSlider />
    <VideoSwiper
      v-if="votedvideos"
      headlineTitle="My Votes"
      :videos="votedvideos"
    />
    <VideoSwiper
      v-if="popularvideos"
      headlineTitle="Popular Choice (By Vote)"
      :videos="popularvideos"
    />

    <VideoSwiper headlineTitle="映画部門" :videos="filmvideos" />
    <VideoSwiper
      headlineTitle="ショートムービー・その他部門"
      :videos="shortvideos"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      lighthousealert: false,
      allvideos: "",
      votedvideos: "",
      popularvideos: "",
      filmvideos: "",
      shortvideos: ""
    };
  },
  mounted() {
    this.getFilms();
    this.getVoted();
    this.getCate();
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
    },
    async getPopular() {
      const videos = await this.$strapi.find("videos", {
        _sort: "votedusers:ASC"
      });
      this.popularvideos = videos;
    },
    async getCate() {
      var pts = await this.$strapi.find("videos", {
        videocategory: 1
      });
      var pta = await this.$strapi.find("videos", {
        videocategory: 2
      });
      this.filmvideos = pts;
      this.shortvideos = pta;
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
