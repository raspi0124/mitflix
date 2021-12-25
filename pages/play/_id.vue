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
          <span v-if="hover" class="ml-2">詳細</span>
        </v-expand-x-transition>
      </v-btn></v-hover
    >
    <v-hover v-if="!voted" v-slot:default="{ hover }" open-delay="200"
      ><v-btn
        style="margin-bottom:40vh"
        dark
        fixed
        bottom
        right
        text
        :loading="voteloading"
        :disabled="voteloading || voteclosed || !$strapi.user"
        @click="votevideo()"
      >
        <v-icon>mdi-vote</v-icon
        ><v-expand-x-transition>
          <span v-if="hover" class="ml-2">投票</span>
        </v-expand-x-transition>
      </v-btn></v-hover
    >
    <v-hover v-if="voted" v-slot:default="{ hover }" open-delay="200">
      <v-btn
        style="margin-bottom:40vh"
        dark
        fixed
        bottom
        right
        text
        :loading="voteloading"
        :disabled="voteloading || voteclosed || !$strapi.user"
        @click="votedclick()"
      >
        <v-icon>mdi-check</v-icon
        ><v-expand-x-transition>
          <span v-if="hover" class="ml-2">投票済み</span>
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
  mounted() {
    this.getVideo(this.$route.params.id);
    this.isVoted();
  },
  activated() {
    this.isVoted();
  },
  data() {
    return {
      id: this.$route.params.id,
      video: null,
      iserror: false,
      //ここから投票関連
      voted: false,
      voteloading: false,
      voteclosed: false,
      votedclicked: false
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
    },
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
