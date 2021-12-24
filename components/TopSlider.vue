<!--ホーム画面のスライダー用コンポーネント-->
<template>
  <v-carousel
    cycle
    hide-delimiter-background
    delimiter-icon="mdi-minus"
    show-arrows-on-hover
    class="rounded"
    height="100vh"
    v-if="films"
  >
    <v-carousel-item
      v-for="(film, i) in films"
      :key="i"
      :src="film.thumbnail.url"
    >
      <v-row class="largefilmImg">
        <v-col cols="12" xs="12" sm="12" md="5" lg="5">
          <v-card
            outlined
            tile
            height="100vh"
            color="transparent"
            class="d-flex"
            :class="{
              'my-3 pt-8': $vuetify.breakpoint.smAndDown,
              'ml-16 mt-16': $vuetify.breakpoint.mdAndUp
            }"
          >
            <v-container>
              <v-row style="height:25%">
                <v-col>
                  <v-img
                    style="object-fit: cover; max-height: 25vh; width: auto;"
                    :src="film.logo.url"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row style="height:25%">
                <v-col>
                  <div class=" align-center justify-center">
                    {{ film.summary }}
                  </div>
                </v-col>
              </v-row>
              <v-row class="pt-16">
                <v-col
                  v-show="$vuetify.breakpoint.mdAndUp"
                  class="align-center justify-center"
                >
                  <div>
                    <v-btn :to="'/play/' + film.id">
                      <v-icon>mdi-play</v-icon> Play</v-btn
                    >
                    <v-btn class="ml-3" :to="'/film/' + film.id"
                      ><v-icon class="pr-1">mdi-information-outline</v-icon
                      >Detail</v-btn
                    >
                  </div>
                </v-col>
                <v-col
                  v-show="$vuetify.breakpoint.smAndDown"
                  class="align-center justify-center"
                >
                  <v-container class="mt-5 center">
                    <v-btn :to="'/play/' + film.id"
                      ><v-icon>mdi-play</v-icon> Play</v-btn
                    >
                    <v-btn class="center" :to="'/film/' + film.id"
                      ><v-icon>mdi-information-outline</v-icon>Detail</v-btn
                    >
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="0" xs="0" sm="0" md="7" lg="7"> </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data() {
    return {
      films: [],
      currtime: 0
    };
  },
  methods: {
    async getFilms() {
      //ここでスライド一覧のjsonを取得
      this.films = await this.$strapi.find("videos");
    },
    currentUnixTime() {
      this.currtime = Math.floor(Date.now() / 1000);
    }
  },
  mounted() {
    this.getFilms();
    this.currentUnixTime();
  },
  activated() {
    //If the current time is more then a day, then get the new data
    if (this.currtime < Math.floor(Date.now() / 1000) - 3600) {
      this.getFilms();
      this.currentUnixTime();
    }
  }
};
</script>
