<template>
  <div class="mt-8">
    <div v-if="videos">
      <div
        v-for="(video, index) in videos"
        :key="video.id"
        min-height="200px"
        min-width="300px"
        max-height="25vh"
        max-width="25vw"
        style="min-height:200px;min-width:300px;"
      >
        <v-row no-gutters>
          <v-col class="center" cols="2" xs="2" sm="2" md="1" lg="1">
            <span
              class="strokedtext text-center center"
              style="font-size:120px;z-index:32; position:relative;transform:translateY(-50%);"
              >{{ index + 1 }}</span
            >
          </v-col>
          <v-col cols="10" xs="10" sm="10" md="4" lg="4">
            <nuxt-link :to="'/film/' + video.id">
              <div class="imgWrapper">
                <v-img
                  min-height="200px"
                  min-width="300px"
                  max-height="25vh"
                  class="imginWrapper"
                  style="min-height:200px;min-width:300px;"
                  :src="video.thumbnail.url"
                >
                  <div
                    class="d-flex transparent mx-5 pt-3 mt-3"
                    style="width: 80%;"
                  >
                    <v-img class="mx-5 mt-8" :src="video.logo.url"></v-img>
                  </div>
                </v-img>
              </div>
            </nuxt-link>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="3" lg="3">
            <v-container fill-height>
              {{ summaryreducted(video.summary) }}
            </v-container>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="2" lg="2">
            <v-container fill-height>
              {{ video.casts }}
            </v-container>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="2" lg="2">
            <v-container class="pt-3"
              ><v-btn :to="'/play/' + video.id">
                <v-icon>mdi-play</v-icon> 再生</v-btn
              ></v-container
            >
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["videos"],
  methods: {
    summaryreducted(summary) {
      if (summary.length > 100) {
        return summary.substr(0, 100) + "...";
      } else {
        return summary;
      }
    }
  }
};
</script>
