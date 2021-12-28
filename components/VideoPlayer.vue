<template>
  <vue-plyr ref="plyr" v-if="video">
    <video
      controls
      crossorigin
      playsinline
      autoplay
      :data-poster="video.thumbnail.url"
    >
      <source :src="video.videosourceurl" />
    </video>
  </vue-plyr>
</template>
<script>
export default {
  props: ["video"],
  methods: {
    findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
    play() {
      this.$refs.plyr.player.play();
    },
    pause() {
      this.$refs.plyr.player.pause();
    },
    getCurrentTime() {
      return this.$refs.plyr.player.currentTime;
    },
    getStoreTime() {
      var data = this.$store.state.videoPlaying;
      var index = this.findWithAttr(data, "videoid", this.video.id);
      if (index !== -1) {
        return data[index].currentTime;
      } else {
        return 0;
      }
    },
    applyStoreCurrentTime() {
      console.log("APPLY CURRENT", this.getStoreTime());
      this.$refs.plyr.player.currentTime = this.getStoreTime();
    },
    paused() {
      //動画が停止された際現在時間をstoreに保存
      var currentTime = this.getCurrentTime();
      this.$store.dispatch("setVideoPlaying", {
        videoid: this.video.id,
        currentTime: currentTime
      });
      console.log(this.$store.state.videoPlaying);
    },
    ended() {
      this.$emit("ended");
      this.$store.dispatch("setVideoPlaying", {
        videoid: this.video.id,
        currentTime: 0
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.paused();
    // next()は必ず呼び出さないといけない
    next();
  },
  mounted() {
    this.$refs.plyr.player.on("pause", () => this.paused());
    this.$refs.plyr.player.on("ended", () => this.ended());
    //this.$refs.plyr.player.on("ready", () => this.applyStoreCurrentTime());
  }
};
</script>
