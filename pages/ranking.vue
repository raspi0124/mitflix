<template>
  <v-container v-if="allvideos && ordered">
    <h1>現在のランキング (内部用)</h1>
    <RawListVideo :videos="ordered" />
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      allvideos: "",
      ordered: ""
    };
  },
  mounted() {
    this.getFilms();
  },
  methods: {
    async getFilms() {
      var pts = await this.$strapi.find("videos");
      this.allvideos = pts;
      this.orderByVoteCount(this.allvideos);
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
    }
  }
};
</script>
