<!--記事をグリッド式に一覧表示するコンポーネント-->
<template>
  <v-main>
    <v-container>
      <v-container grid-list-lg>
        <v-layout row wrap v-if="articles">
          <v-flex
            xs12
            sm6
            md6
            lg4
            v-for="articles in orderedarticles"
            :key="articles.id"
          >
            <v-card class="mx-auto" max-width="400">
              <v-img
                class="white--text align-end"
                height="200px"
                :src="articles.picture.url"
              >
                <v-card-title class="shadowtext">{{
                  articles.title
                }}</v-card-title>
              </v-img>
              <MemberName
                v-if="articles.author"
                class="text-left"
                :membername="
                  articles.author.displayname || articles.author.username
                "
                :memberid="articles.author.id"
                :avater="articles.author.avater"
              />
              <v-card-text class="text--primary text-left">
                <div>{{ articles.short_description }}</div>
                <!--eslint-disable-next-line-->
                <div>
                  <v-btn
                    style="margin-left: 0;"
                    x-small
                    text
                    v-for="n in articles.tags"
                    v-bind:key="n"
                    color="#7FBFFF"
                    >#{{ n.name }}</v-btn
                  >
                </div>
                <div v-if="articles.category && articles.category.name">
                  <v-btn
                    style="margin-left: 0;"
                    depressed
                    x-small
                    color="accent"
                    :to="'/category/' + articles.category.id"
                    >{{ articles.category.name }}</v-btn
                  >
                </div>
              </v-card-text>
              <v-card-actions>
                <div class="articles_btns">
                  <nuxt-link :to="`/article/${articles.id}`">
                    <v-btn text color="orange">見てみる</v-btn>
                  </nuxt-link>
                </div>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <!--ローディング中のプレースホルダ-->
        <v-skeleton-loader
          width="20vw"
          type="card, actions"
          v-else
        ></v-skeleton-loader>
        <!--エラー時のアラート用-->
        <v-snackbar v-model="iserror" timeout="60000">
          Error occured while retrieving information from server. Please try
          again.
        </v-snackbar>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "ArticleListComponent",
  props: ["articles"],
  data() {
    return {
      iserror: false
    };
  },
  methods: {
    //更新がどれぐらい今に近いか計算する関数
    ordergen(project) {
      var currentstamp = dayjs().unix();
      var updatestamp = dayjs(project.updated_at).unix();
      var finalorder = currentstamp - updatestamp;
      console.info(project.id, finalorder);
      return parseInt(finalorder);
    },
    //記事を更新順に並べ変える関数
    orderit(articles) {
      for (var key in articles) {
        const article = articles[key];
        articles[key].ordernum = this.ordergen(article);
      }
      articles.sort(function(a, b) {
        if (a.ordernum < b.ordernum) return -1;
        if (a.ordernum > b.ordernum) return 1;
        return 0;
      });
      return articles;
    }
  },
  computed: {
    orderedarticles() {
      return this.orderit(this.articles);
    }
  }
};
</script>
