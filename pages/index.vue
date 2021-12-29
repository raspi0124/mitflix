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
    <VideoSwiper headlineTitle="MITAPROトレーラー" :videos="cmvideos" />
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
      shortvideos: "",
      cmvideos: ""
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
    shuffle(sourceArray) {
      for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
      }
      return sourceArray;
    },
    getPopular() {
      this.popularvideos = this.allvideos;
      this.popularvideos = this.orderByVoteCount(this.popularvideos);
      //this.giveRank(this.popularvideos);
    },
    orderByVoteCount(allvideos) {
      for (var key in allvideos) {
        const video = allvideos[key];
        var ordernum = video.votedusers.length;
        allvideos[key].ordernum = ordernum;
      }
      allvideos.sort(function(a, b) {
        if (a.ordernum > b.ordernum) return -1;
        if (a.ordernum < b.ordernum) return 1;
        return 0;
      });
      //ソート処理は何度も繰り返すと重くなるのでorderedにキャッシュしておく
      this.ordered = allvideos;
      return allvideos;
    },
    async getFilms() {
      var pts = await this.$strapi.find("videos");
      this.allvideos = pts;
      this.getPopular();
    },
    async getVoted() {
      const user = await this.$strapi.findOne("users", this.$strapi.user.id);
      this.votedvideos = user.votedvideos;
    },
    async getCate() {
      var pts = await this.$strapi.find("videos", {
        videocategory: 1
      });
      var pta = await this.$strapi.find("videos", {
        videocategory: 2
      });
      var ptb = await this.$strapi.find("videos", {
        videocategory: 3
      });
      this.filmvideos = this.shuffle(pts);
      this.shortvideos = this.shuffle(pta);
      this.cmvideos = ptb;
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
