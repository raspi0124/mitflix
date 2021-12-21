<template>
  <v-avatar size="128">
    <img :src="avaterpic" :alt="membername" />
  </v-avatar>
</template>

<script>
export default {
  props: {
    avater: {
      default: {
        formats: {
          thumbnail: {
            url:
              "https://storage.googleapis.com/mitapro/icon_412338ca4b/icon_412338ca4b.png"
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
        return "https://storage.googleapis.com/mitapro/icon_412338ca4b/icon_412338ca4b.png";
      }
    }
  }
};
</script>
