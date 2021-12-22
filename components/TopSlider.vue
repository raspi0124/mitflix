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
      <v-row no-gutters>
        <v-col cols="5" xs="5" sm="5" md="5" lg="5" fill-height>
          <v-card
            outlined
            tile
            height="100vh"
            color="transparent"
            class="d-flex ml-16 mt-16"
          >
            <v-container>
              <v-row style="height:25%">
                <v-col style="height:25%">
                  <v-img
                    style="object-fit: cover; max-height: 25vh; width: auto;"
                    :src="film.logo.url"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row style="height:25%">
                <v-col style="height:25%">
                  <div class=" align-center justify-center">
                    {{ film.summary }}
                  </div>
                </v-col>
              </v-row>
              <v-row class="pt-16" style="height:25%">
                <v-col>
                  <div class=" align-center justify-center">
                    <v-btn><v-icon>mdi-play</v-icon> Play</v-btn>
                    <v-btn class="ml-3"
                      ><v-icon class="pr-1">mdi-information-outline</v-icon
                      >Detail</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="6" xs="6" sm="6" md="6" lg="6"> </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data() {
    return {
      films: []
    };
  },
  methods: {
    async getFilms() {
      //ここでスライド一覧のjsonを取得
      this.films = await this.$strapi.find("videos");
    }
  },
  activated() {
    this.getFilms();
  }
};
</script>
