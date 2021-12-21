<!--画像アップロード用のコンポーネント このコンポーネント単体でアップロード動作まで行う
アップロード完了時にsetImageに設定された関数向けにアップロード情報をemitする-->
-->
<template>
  <section class="container">
    <v-flex>
      <v-file-input
        :label="label"
        filled
        v-model="file"
        accept="image/*"
        prepend-icon="mdi-camera"
        :loading="uploading"
      ></v-file-input>
    </v-flex>
    <v-flex class="center">
      <v-btn color="primary" @click="onSubmit">画像をアップロード</v-btn>
    </v-flex>
    <span v-if="uploaded">
      <v-icon color="green darken-2">
        mdi-check-bold
      </v-icon>
      The image has been uploaded. *Make sure to click "公開" or "更新" in order
      to apply changes to the project.
    </span>
  </section>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      uploaded: false,
      uploading: false,
      label: "Image not set"
    };
  },
  methods: {
    //画像が選択された際
    async onSubmit() {
      if (this.file) {
        //formDataオブジェクトを生成
        const formData = new FormData();
        formData.append("files", this.file);
        this.uploading = true;
        //アップロード
        const response = await this.$strapi.$http
          .$post("/upload", formData)
          .catch(error => {
            return error.response;
          });
        console.log("UPLIMG RESPONSE", response);
        //アップロードが完了したらsetImage関数を実行させるようEmit
        this.$emit("setImage", response);
        this.$toast.success("画像をアップロードしました").goAway(16000);
        this.uploaded = true;
        this.uploading = false;
        this.label = "Image set";
      } else {
        this.$toast.error("画像が選択されていません").goAway(4000);
      }
    }
  }
};
</script>
