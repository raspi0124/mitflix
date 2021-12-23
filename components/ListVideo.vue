<!--記事をグリッド式に一覧表示するコンポーネント-->
<template>
  <v-main>
    <v-container grid-list-lg>
      <v-layout row wrap v-if="videos">
        <v-flex xs12 sm6 md6 lg4 v-for="video in orderedvideos" :key="video.id">
          <nuxt-link :to="'/film/' + video.id">
            <v-card class="mx-auto imgWrapper" max-width="800px">
              <v-img
                class="imginWrapper align-end"
                height="300px"
                :src="video.thumbnail.url"
              >
                <v-card-title class="shadowtext">
                  <div class="d-flex transparent" style="height: 100%;">
                    <v-img
                      class="mx-3 mt-5"
                      width="280px"
                      max-height="300px"
                      :src="video.logo.url"
                    ></v-img>
                  </div>
                </v-card-title>
              </v-img>
            </v-card>
          </nuxt-link>
        </v-flex>
      </v-layout>
      <!--ローディング中のプレースホルダ-->
      <v-skeleton-loader width="20vw" type="image" v-else></v-skeleton-loader>
      <!--エラー時のアラート用-->
      <v-snackbar v-model="iserror" timeout="60000">
        Error occured while retrieving information from server. Please try
        again.
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "ArticleListComponent",
  props: ["videos"],
  data() {
    return {
      iserror: false
    };
  },
  methods: {
    //更新がどれぐらい今に近いか計算する関数
    ordergen(video) {
      var currentstamp = dayjs().unix();
      var updatestamp = dayjs(video.updated_at).unix();
      var finalorder = currentstamp - updatestamp;
      console.info(video.id, finalorder);
      return parseInt(finalorder);
    },
    //記事を更新順に並べ変える関数
    orderit(videos) {
      for (var key in videos) {
        const video = videos[key];
        videos[key].ordernum = this.ordergen(video);
      }
      videos.sort(function(a, b) {
        if (a.ordernum < b.ordernum) return -1;
        if (a.ordernum > b.ordernum) return 1;
        return 0;
      });
      return videos;
    }
  },
  computed: {
    orderedvideos() {
      return this.orderit(this.videos);
    }
  }
};
</script>
