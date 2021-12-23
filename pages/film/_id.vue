<template>
  <div>
    <VideoDetail :video="video" />
    <!--エラー時のアラート用-->
    <v-snackbar v-model="iserror" timeout="60000">
      Error occurred while retrieving information from server. Please try again.
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      video: null,
      iserror: false
    };
  },
  methods: {
    setVideo: function(detail) {
      if (detail.status !== 200) {
        this.iserror = true;
      } else {
        this.video = detail.data;
      }
    },
    async getVideo(id) {
      var pts = await this.$strapi.findOne("videos", id);
      this.video = pts;
    }
  },
  async mounted() {
    this.getVideo(this.$route.params.id);
  },
  head() {
    return {
      title: this.$route.params.id + " - Video Detail",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>
