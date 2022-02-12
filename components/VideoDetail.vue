<!--映像詳細用のコンポーネント-->
<template>
  <v-app>
    <v-row justify="center" width="100vw" height="100vh">
      <v-col width="100vw" height="100vh">
        <v-card width="100vw" v-if="video">
          <v-img class="white--text align-end" height="100vh" :src="pictureurl">
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
                  <v-container class="mt-16">
                    <v-row style="height:25%">
                      <v-col>
                        <v-img
                          style="object-fit: cover; max-height: 25vh; width: auto;"
                          :src="video.logo.url"
                        ></v-img>
                      </v-col>
                    </v-row>
                    <v-row class="mt-8" style="height:25%">
                      <v-col>
                        <div class=" align-center justify-center">
                          {{ video.summary }}
                        </div>
                      </v-col>
                    </v-row>
                    <v-row class="pt-16">
                      <v-col
                        v-show="$vuetify.breakpoint.mdAndUp"
                        class="align-center justify-center"
                      >
                        <div>
                          <v-btn :to="'/play/' + video.id">
                            <v-icon>mdi-play</v-icon> 再生</v-btn
                          >
                          <v-btn
                            v-if="!voted"
                            class="ml-5"
                            :loading="voteloading"
                            :disabled="
                              voteloading || voteclosed || !$strapi.user
                            "
                            @click="votevideo()"
                            ><v-icon>mdi-vote</v-icon>投票</v-btn
                          >
                          <v-btn
                            v-if="voted && !votedclicked"
                            class="ml-5"
                            :loading="voteloading"
                            :disabled="
                              voteloading || voteclosed || !$strapi.user
                            "
                            @click="votedclick()"
                            ><v-icon>mdi-check</v-icon>投票済み</v-btn
                          >
                          <v-btn
                            v-if="voted && votedclicked"
                            color="danger"
                            class="ml-5"
                            :loading="voteloading"
                            :disabled="
                              voteloading || voteclosed || !$strapi.user
                            "
                            @click="removevote()"
                            ><v-icon>mdi-delete</v-icon>投票を撤回</v-btn
                          >
                        </div>
                      </v-col>
                      <v-col
                        v-show="$vuetify.breakpoint.smAndDown"
                        class="align-center justify-center"
                      >
                        <v-container class="mt-5 center">
                          <v-btn :to="'/play/' + video.id"
                            ><v-icon>mdi-play</v-icon> 再生</v-btn
                          >
                          <v-btn
                            v-if="!voted"
                            class="center"
                            :loading="voteloading"
                            :disabled="
                              voteloading || voteclosed || !$strapi.user
                            "
                            @click="votevideo()"
                            ><v-icon>mdi-vote</v-icon>投票</v-btn
                          >
                          <v-btn
                            v-if="voted && !votedclick"
                            class="center"
                            :loading="voteloading"
                            :disabled="
                              voteloading || voteclosed || !$strapi.user
                            "
                            @click="votedclick()"
                            ><v-icon>mdi-check</v-icon>投票済み</v-btn
                          >
                          <v-btn
                            v-if="voted && votedclick"
                            class="center"
                            :loading="voteloading"
                            :disabled="
                              voteloading || voteclosed || !$strapi.user
                            "
                            @click="removevote()"
                            ><v-icon>mdi-delete</v-icon>投票を撤回</v-btn
                          >
                        </v-container>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="0" xs="0" sm="0" md="7" lg="7"> </v-col>
            </v-row>
          </v-img>
          <!--左側カラム-->
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="9"
              lg="9"
              order="12"
              order-md="1"
              order-lg="1"
              order-xl="1"
            >
              <!--紹介文-->
              <v-card-text class="text--primary px-16">
                <h2>Casts</h2>
                <div style="padding-top:20px; padding-bottom:20px;">
                  {{ video.casts }}
                </div>
              </v-card-text>
            </v-col>
            <!--右側カラム-->
            <v-col
              justify="center"
              cols="12"
              xs="12"
              sm="12"
              md="3"
              lg="3"
              order="1"
              order-md="12"
              order-lg="12"
              order-xl="12"
            >
              <v-card
                class="pa-2"
                outlined
                tile
                height="100%"
                color="rgba(0, 0, 0, 1)"
                align="center"
                style="margin-bottom:20px"
              >
                <!--この記事が紐づいているプロジェクトの名前-->
                <ProjectName
                  v-if="video.project !== null"
                  :projectname="video.projectname || video.project.projectname"
                  :projectid="video.project.id"
                  :avater="video.projectlogo || video.project.picture"
                />
              </v-card>
            </v-col>
          </v-row>
          <VideoSwiper
            class="pl-8"
            headlineTitle="このカテゴリの動画"
            :videos="categoryvideos"
          ></VideoSwiper>
        </v-card>

        <!--ローディング中のプレースホルダ-->
        <div v-else>
          <v-skeleton-loader
            width="100vw"
            height="100vh"
            type="image"
          ></v-skeleton-loader>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.isVoted();
  },
  activated() {
    this.isVoted();
  },
  data() {
    return {
      id: this.$route.params.id,
      categoryvideos: "",
      //ここから投票関連
      voted: false,
      voteloading: false,
      voteclosed: false,
      votedclicked: false
    };
  },
  //上位コンポーネント、この場合は/pages/film/_id.vue、からの情報等の引継ぎ。video変数として保存。
  props: ["video"],
  methods: {
    //上位コンポーネントの準備が完了した際この関数を発火
    async UpperReady() {
      var categoryid = this.video.videocategory.id;
      var pts = await this.$strapi.find("videos", {
        videocategory: categoryid
      });
      this.categoryvideos = pts;
      console.log("UPPERREADYFIN");
    },
    //ここから投票関連
    async addvote() {
      var curvotedfilms = [];
      //自ユーザーの情報を取得 (this.$strapi.userだと#10229で報告済みのバグが発生するためユーザーID指定で取得)
      const user = await this.$strapi.findOne("users", this.$strapi.user.id);
      var votedvideos = user.votedvideos;
      //今入っているプロジェクトをcurvotedfilmsというArrayに格納
      for (var key in votedvideos) {
        var video = votedvideos[key];
        curvotedfilms.push(video.id);
      }
      //curvotedfilmsにこのプロジェクトのIDを追加
      curvotedfilms.push(this.id);
      //リクエスト用のjsonを生成
      var form = { votedvideos: curvotedfilms };
      //送信
      const newuser = await this.$strapi.update(
        "users",
        this.$strapi.user.id,
        form
      );
      this.$strapi.setUser(newuser);
      //フォロー後にプロジェクト詳細を更新
      this.$emit("reload");
      this.$toast.success("投票しました").goAway(8000);
      this.voted = true;
      this.$emit("reload");
    },
    //既存のvotedvideosからこのプロジェクトを消す(フォローを解除する)関数
    async removevote() {
      this.loader = "leaveloading";
      var curvotedfilms = [];
      //自ユーザーの情報を取得 (this.$strapi.userだと#10229で報告済みのバグが発生するためユーザーID指定で取得)
      const user = await this.$strapi.findOne("users", this.$strapi.user.id);
      var votedvideos = user.votedvideos;
      //今入っているプロジェクトをcurvotedfilmsというArrayに格納
      for (var key in votedvideos) {
        var video = votedvideos[key];
        curvotedfilms.push(video.id);
      }
      //curvotedfilmsからこのプロジェクトのIDを削除
      var newcurvotedfilms = this.removeId(curvotedfilms, Number(this.id));
      //リクエスト用のjsonを生成
      var form = { votedvideos: newcurvotedfilms };
      //送信
      const newuser = await this.$strapi.update(
        "users",
        this.$strapi.user.id,
        form
      );
      this.$strapi.setUser(newuser);
      this.votedclicked = false;
      this.$toast.error("投票を撤回しました").goAway(8000);
      this.voted = false;
      this.$emit("reload");
    },
    votevideo() {
      this.loader = "voteloading";
      if (this.$strapi.user) {
        this.addvote();
      } else {
        this.$toast.info("ログインしていません").goAway(8000);
      }
    },
    votedclick() {
      this.votedclicked = true;
    },
    //すでに投票済みか確認する関数
    async isVoted() {
      //もしユーザーがログインしていない場合
      if (!this.$strapi.user) {
        this.voted = false;
        //関数をこの時点で修了
        return;
      }
      var curvotedfilms = [];
      //自ユーザーの情報を取得 (this.$strapi.userだと#10229で報告済みのバグが発生するためユーザーID指定で取得)
      const user = await this.$strapi.findOne("users", this.$strapi.user.id);
      var votedvideos = user.votedvideos;
      //今入っているプロジェクトをcurvotedfilmsというArrayに格納
      for (var key in votedvideos) {
        var video = votedvideos[key];
        curvotedfilms.push(String(video.id));
      }
      //もしcurvotedfilmsにこのプロジェクトが入っていれば
      if (curvotedfilms.includes(String(this.id))) {
        //votedとして設定
        this.voted = true;
      } else {
        //votedをfalseに設定
        this.voted = false;
      }
    },
    removeId(array, value) {
      var index = array.indexOf(value);
      array.splice(index, 1);
      return array;
    }
  },
  //ボタンのローダー用
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
    video: function(newVal, oldVal) {
      if (newVal.videocategory.id) {
        this.UpperReady();
      }
    }
  },
  computed: {
    pictureurl() {
      return (
        this.video.thumbnail.url ||
        "https://storage.googleapis.com/fileloc/shibuya-2328029_1920.jpg"
      );
    }
  }
};
</script>
