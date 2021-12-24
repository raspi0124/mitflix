<!--プロジェクトや記事ページで使われている著者の表示コンポーネント-->
<template>
  <a
    :href="'https://mitapro.jp/project/' + projectid"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="solomember white--text">
      <v-avatar size="48">
        <img :src="avaterpic" :alt="projectname" />
      </v-avatar>
      {{ this.projectname }}
    </div>
  </a>
</template>

<script>
export default {
  props: {
    projectname: {
      type: String,
      default: "MITAPRO PROJECT"
    },
    projectid: {
      //type: String,
      default: "22"
    },
    avater: {
      default: {
        formats: {
          thumbnail: {
            url:
              "https://storage.googleapis.com/mitapro/thumbnail_logo_inverted_832c37ec8f/thumbnail_logo_inverted_832c37ec8f.png"
          }
        }
      }
    }
  },
  computed: {
    avaterpic() {
      if (this.avater) {
        return this.avater.formats.thumbnail.url;
      } else {
        return "https://storage.googleapis.com/mitapro/thumbnail_logo_inverted_832c37ec8f/thumbnail_logo_inverted_832c37ec8f.png";
      }
    }
  }
};
</script>
