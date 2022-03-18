<template>
  <div class="mx-8">
    <h1 class="center centerh2">最終結果</h1>
    <h2 class="center extcenterh2">総合部門</h2>
    <ResultRanking v-if="allresultvideos" :videos="allresultvideos" />
    <h2 class="center extcenterh2">映画部門</h2>
    <ResultRanking v-if="filmresultvideos" :videos="filmresultvideos" />
    <h2 class="center extcenterh2">ショートムービー・その他部門</h2>
    <ResultRanking v-if="shortresultvideos" :videos="shortresultvideos" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      allresultvideos: "",
      filmresultvideos: "",
      shortresultvideos: ""
    };
  },
  mounted() {
    this.getAllVideos();
    //    this.getFilmVideos();
    //    this.getShortVideos();
  },
  methods: {
    async getAllVideos() {
      var vids = await this.$strapi.find("videos");
      this.allresultvideos = this.orderByVotePoint(vids);
      var vids2 = await this.$strapi.find("videos", {
        videocategory: 1
      });
      this.filmresultvideos = this.orderByVotePoint(vids2);
      var vids3 = await this.$strapi.find("videos", {
        videocategory: 2
      });
      this.shortresultvideos = this.orderByVotePoint(vids3);
    },
    orderByVotePoint(allvideos) {
      for (var key in allvideos) {
        const video = allvideos[key];
        var ordernum = video.votepoint;
        allvideos[key].ordernum = ordernum;
      }
      allvideos.sort(function(a, b) {
        if (a.ordernum > b.ordernum) return -1;
        if (a.ordernum < b.ordernum) return 1;
        return 0;
      });
      //ソート処理は何度も繰り返すと重くなるのでorderedにキャッシュしておく
      //this.ordered = allvideos; いるか疑問になったので
      return allvideos;
    }
  },
  head() {
    return {
      title: "Results",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>

<style></style>
