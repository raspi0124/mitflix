<script>
export default {
  //ダッシュボードのtop.vueにリダイレクト
  fetch({ redirect }) {
    redirect(301, "/dashboard/top");
  }
};
</script>
