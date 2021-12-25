<template>
  <div>
    <VideoSlider :films="videos" />
    <h2 class="pt-8 pl-8">
      {{ categoryinfo.name }}
    </h2>
    <ListVideo :videos="videos" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryinfo: {
        name: "Loading..."
      },
      videos: null
    };
  },
  methods: {
    async getCategory(id) {
      var pts = await this.$strapi.findOne("videocategories", id);
      this.categoryinfo = pts;
    },
    async getVideos(categoryid) {
      var pts = await this.$strapi.find("videos", {
        videocategory: categoryid
      });
      var shuffled = this.shuffle(pts);
      this.videos = shuffled;
    },
    shuffle(sourceArray) {
      for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
      }
      return sourceArray;
    }
  },
  //activated()がある場合はmountedはいらないけど万が一keep-aliveを消すことになったときに面倒なので一応残しておく
  async mounted() {
    this.getCategory(this.$route.params.id);
    this.getVideos(this.$route.params.id);
  },
  //このコンポーネントが有効(表示)になったら実行される, keep-alive(キャッシュ)利用時ではmounted()と同じ挙動をする keep-aliveによってキャッシュされた内容の更新用
  activated() {
    //ページが表示状態になったらユーザー詳細を取得/更新
    this.getCategory(this.$route.params.id);
    this.getVideos(this.$route.params.id);
  },
  head() {
    return {
      title: this.categoryinfo.name + " - ",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>
