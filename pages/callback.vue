<!--ログイン成功後飛ばされるファイル-->
<template>
  <div>
    <h1>Loading...</h1>
  </div>
</template>
<script>
export default {
  layout: "public",
  async mounted() {
    try {
      //パラメーターからアクセストークンを取得しそこからJWTを取得
      const { jwt } = await this.$strapi.$http.$get("/auth/auth0/callback", {
        searchParams: {
          access_token: this.$route.query.access_token
        }
      });
      //JWTをthis.$strapiのトークンに設定
      this.$strapi.setToken(jwt);
      //ユーザー情報を取得
      await this.$strapi.fetchUser();

      window.location.href = "/";
      //redirect(this.$strapi.$cookies.get("redirect") || "/dashboard/top");
    } catch (e) {
      //エラーが発生したらconsoleに吐き出しリダイレクト
      console.log(e);
      console.log(this.$route.query.error);
      if (this.$route.query.error == "unauthorized") {
        alert(
          "ログインに失敗しました。ログイン時に学校から配布されたGoogleアカウントを選択しているかご確認の上もう一度お試しください。"
        );
        this.$sentry.captureException(
          new Error("Login Error: Unauthorized Account")
        );
        window.location.href =
          "https://mitalink.jp.auth0.com/v2/logout?client_id=uMIQNKT0d2xsi0kcOi3wViSEjhXNBQ0m&returnTo=https://mitapro.jp/";
      }
      window.location.href = "/";
    }
  }
};
</script>
