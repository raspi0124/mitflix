<template
  ><div>
    <div v-if="videos" class="pa-8">
      <h2 class="py-3 pb-5">{{ headlineTitle }}</h2>
      <VueSlickCarousel
        style="height:25vh;min-height:200px;min-width:200px;"
        v-bind="SlickSettings"
      >
        <div class="d-flex flex-column" v-for="video in videos" :key="video.id">
          <nuxt-link :to="'/film/' + video.id">
            <div class="imgWrapper">
              <v-img
                height="25vh"
                min-height="200px"
                min-width="300px"
                class="imginWrapper"
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
          </nuxt-link>
        </div>
      </VueSlickCarousel>
    </div>
    <div v-else>
      <v-skeleton-loader width="100vw" type="image"></v-skeleton-loader>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  props: ["headlineTitle", "videos"],
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
