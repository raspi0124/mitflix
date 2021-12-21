<template>
  <div>
    <v-btn type="primary" @click="loginWithStrapi">ログイン</v-btn>
  </div>
</template>

<script>
export default {
  layout: "public",
  head() {
    return {
      title: "Login"
    };
  },
  mounted() {
    if (this.$strapi.user) {
      window.location = "/";
    } else {
      this.loginWithStrapi();
    }
  },
  methods: {
    loginWithStrapi: function() {
      window.location = this.$config.STRAPI_URL + "connect/auth0";
    }
  }
};
</script>
