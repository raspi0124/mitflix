`<template>
  <div>
    <h1 v-if="lighthousealert">
      パフォーマンス無視で実装速度優先で実装してるのでLighthouseのスコアは遅いですがひと段落ついた時に高速化しますはい...
    </h1>
    <TopSlider />
  </div>
</template>
<script>
import TopSlider from "~/components/TopSlider.vue";

export default {
  components: {
    TopSlider
  },
  data() {
    return {
      lighthousealert: false
    };
  },
  mounted() {
    this.detectlighthouse();
    //console.log(process.env.currentenv);
  },
  methods: {
    detectlighthouse() {
      if (window.navigator.userAgent.toLowerCase().includes("lighthouse")) {
        alert(
          "パフォーマンス無視で速度優先で実装してるのでLighthouseのスコアは遅いですがひと段落ついた時に高速化しますはい..."
        );
        console.log(
          "パフォーマンス無視で速度優先で実装してるのでLighthouseのスコアは遅いですがひと段落ついた時に高速化しますはい..."
        );
        this.lighthousealert = true;
      }
    }
  },
  head() {
    return {
      title: "Home",
      meta: [
        { hid: "description", name: "description", content: "description" }
      ]
    };
  }
};
</script>
