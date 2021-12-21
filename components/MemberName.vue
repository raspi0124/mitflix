<!--プロジェクトや記事ページで使われている著者の表示コンポーネント-->
<template>
  <nuxt-link :to="'/user/' + memberid">
    <div class="solomember">
      <v-avatar size="48">
        <img :src="avaterpic" :alt="membername" />
      </v-avatar>
      {{ this.membername }}
      <span class="white--text orgmark" v-if="isorg">ORG</span>
      <span class="white--text orgmark" v-if="isproject">PROJECT</span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    membername: {
      type: String,
      default: "MITALINK USER"
    },
    memberid: {
      //type: String,
      default: "-1"
    },
    avater: {
      default: {
        formats: {
          thumbnail: {
            url:
              "https://storage.googleapis.com/mitapro/icon_412338ca4b/icon_412338ca4b.png"
          }
        }
      }
    },
    isorg: {
      //type: Boolean,
      default: false
    },
    isproject: {
      default: false
    }
  },
  computed: {
    avaterpic() {
      if (this.avater) {
        return this.avater.formats.thumbnail.url;
      } else {
        return "https://storage.googleapis.com/mitapro/icon_412338ca4b/icon_412338ca4b.png";
      }
    }
  }
};
</script>
