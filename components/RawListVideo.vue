<!--記事をグリッド式に一覧表示するコンポーネント-->
<template>
  <v-main>
    <v-container grid-list-lg>
      <v-layout row wrap v-if="videos">
        <v-flex xs12 sm6 md6 lg4 v-for="video in videos" :key="video.id">
          <nuxt-link :to="'/film/' + video.id">
            <v-card class="mx-auto imgWrapper" max-width="800px">
              <v-img
                class="imginWrapper align-end"
                height="300px"
                :src="video.thumbnail.url"
              >
                <div class="center shadowtext">{{ video.ordernum }} 票</div>
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
export default {
  name: "ArticleListComponent",
  props: ["videos"],
  data() {
    return {
      iserror: false
    };
  }
};
</script>
