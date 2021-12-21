<template>
  <v-container>
    <h2 class="noncenterh2 mb-4">Login/Register to Continue</h2>
    <v-btn type="primary" @click="loginWithStrapi">ログイン/登録</v-btn>
  </v-container>
</template>

<script>
export default {
  layout: "public",
  head() {
    return {
      title: "Login/Register"
    };
  },
  methods: {
    loginWithStrapi: function() {
      window.location = this.$config.STRAPI_URL + "connect/auth0";
    }
  }
};
</script>
