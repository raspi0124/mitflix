<template>
  <div>
    ログアウトしました。ホーム画面にリダイレクト中です...<br />
    もしリダイレクトしない場合は<nuxt-link to="/publictop">こちら</nuxt-link
    >をクリックしてください。
  </div>
</template>
<script>
export default {
  layout: "public",
  //ホームにリダイレクト
  fetch({ redirect }) {
    redirect(301, "/publictop");
  }
};
</script>
