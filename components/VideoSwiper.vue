<template
  ><div>
    <div class="pa-8">
      <h2 class="py-3 pb-5">Tekitou</h2>
      <VueSlickCarousel
        style="height:25vh;min-height:200px;min-width:200px;"
        v-bind="SlickSettings"
        v-if="videos"
      >
        <div class="d-flex flex-column" v-for="video in videos" :key="video.id">
          <v-img
            height="25vh"
            min-height="200px"
            min-width="200px"
            :src="video.thumbnail.url"
          >
            <div class="d-flex transparent" style="height: 100%;">
              <v-img
                class="mx-3 mt-3"
                width="80%"
                :src="video.logo.url"
              ></v-img>
            </div>
          </v-img>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  props: ["videos"],
  components: {
    VueSlickCarousel
  },
  data() {
    return {
      hover: "",
      SlickSettings: {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  }
};
</script>
