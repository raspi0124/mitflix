<template>
  <vue-plyr v-if="video">
    <video controls crossorigin playsinline :data-poster="video.thumbnail.url">
      <source :src="video.videosourceurl" />
    </video>
  </vue-plyr>
</template>
<script>
export default {
  props: ["video"]
};
</script>
