<template>
  <div>
    <h2 class="pt-8 pl-8">
      {{ categoryinfo.name }}
    </h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryinfo: {
        name: "Loading..."
      },
      tab: "projects"
    };
  },
  methods: {
    async getCategory(id) {
      var pts = await this.$strapi.findOne("videocategories", id);

      this.categoryinfo = pts;
    }
  },
  //activated()がある場合はmountedはいらないけど万が一keep-aliveを消すことになったときに面倒なので一応残しておく
  async mounted() {
    this.getCategory(this.$route.params.id);
  },
  //このコンポーネントが有効(表示)になったら実行される, keep-alive(キャッシュ)利用時ではmounted()と同じ挙動をする keep-aliveによってキャッシュされた内容の更新用
  activated() {
    //ページが表示状態になったらユーザー詳細を取得/更新
    this.getCategory(this.$route.params.id);
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
