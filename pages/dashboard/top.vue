<template>
  <div>
    <h1>
      こんにちは、{{ this.$strapi.user.username }}さん!
      ダッシュボード(臨時)へようこそ!
    </h1>
    <v-btn depressed color="primary" to="/">トップに戻る </v-btn><br />
    デバッグ用情報:<br />
    email: {{ this.$strapi.user.email }}, <br />
    username: {{ this.$strapi.user.username }},<br />
    displayname: {{ this.$strapi.user.displayname }},<br />
    id: {{ this.$strapi.user.id }}
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  methods: {}
};
</script>
