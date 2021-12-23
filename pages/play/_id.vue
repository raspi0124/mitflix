<template>
  <div v-if="video">
    <VideoPlayer style="height:90vh" :video="video" />
    <v-hover v-slot:default="{ hover }" open-delay="200"
      ><v-btn
        style="margin-bottom:47vh"
        dark
        fixed
        bottom
        right
        text
        :to="'/film/' + video.id"
      >
        <v-icon>mdi-information-outline</v-icon
        ><v-expand-x-transition>
          <span v-if="hover" class="ml-2">Detail</span>
        </v-expand-x-transition>
      </v-btn></v-hover
    >
    <v-hover v-slot:default="{ hover }" open-delay="200"
      ><v-btn style="margin-bottom:40vh" dark fixed bottom right text>
        <v-icon>mdi-vote</v-icon
        ><v-expand-x-transition>
          <span v-if="hover" class="ml-2">Vote</span>
        </v-expand-x-transition>
      </v-btn></v-hover
    >
    <!--エラー時のアラート用-->
    <v-snackbar v-model="iserror" timeout="60000">
      Error occurred while retrieving information from server. Please try again.
    </v-snackbar>
  </div>
</template>
<style>
.plyr--full-ui input[type="range"] {
  color: white;
}

.plyr__control--overlaid {
  background: rgba(0, 0, 0, 0.8);
}

.plyr--video .plyr__control.plyr__tab-focus,
.plyr--video .plyr__control:hover,
.plyr--video .plyr__control[aria-expanded="true"] {
  background: black;
}

.plyr__control.plyr__tab-focus {
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.5);
}

.plyr__menu__container
  .plyr__control[role="menuitemradio"][aria-checked="true"]::before {
  background: white;
  cursor: pointer;
}
.plyr__progress * {
  cursor: pointer;
}
</style>
<script>
export default {
  layout: "mobileplay",
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
      title: "Playing " + this.$route.params.id,
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>
