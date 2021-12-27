<template>
  <div class="all">
    <div class="wrapper center">
      <div class="movie">MITAPRO映画祭</div>
      <div class="job">統括プロデューサー</div>
      <div class="name">J2 Shoya Murakami</div>
      <div class="job">開発/企画</div>
      <div class="name">S3 Junsei Miyazawa</div>
      <div class="job">企画/CM制作</div>
      <div class="name">S2 Kanata Nomura</div>
      <div class="name">J3 Risa Suzuki</div>
      <div class="job">企画</div>
      <div class="name">S2 Ui Yuki</div>
      <div class="name">J3 Minori Saishoji</div>
      <div class="name">J2 Kaoru Nishihata</div>
      <div class="name">Airi Mizuno</div>
      <div class="name">Harutaka Ominato</div>
      <div class="name">Shoma Yamada</div>
      <div class="name">Yuki Takahashi</div>
      <div class="name">せがあ</div>
      <div class="job">何か</div>
      <div class="name">S2 Kai Chiba</div>
      <div class="job">主催</div>
      <div class="name">MITAPRO</div>
      <div class="job">Special Thanks</div>
      <div class="name">Hiroshi Miyajima</div>
      <div class="name">大野先生</div>
      <div class="name">S3 Yuma Ohashi</div>
      <div class="name">S2 Rico Hamada</div>
      <div class="name">コンピュータ部</div>
      <div class="name">岸川先生</div>
      <div class="name">MIS歌謡祭</div>
      <div class="name">野田先生</div>

      <div style="padding-top:128px !important;">
        <v-img
          class="center"
          style="z-index:1000;"
          max-height="16vh"
          min-width="8vw"
          max-width="80vw"
          src="/logo-yoko-cropped-inverted-removebg.png"
          alt="MITAPro映画祭"
        ></v-img>
        <div v-if="this.$vuetify.breakpoint.lgAndUp">
          <div class="movie pt-16" style="font-size:25px;z-index:1000;">
            開催にあたって (PC限定)
          </div>
          <div class="pt-5" style="z-index:1000; font-size:16px;">
            今まで学内の生徒が作った動画がそのままになっていることがある。
            さらに多くの生徒に見せる機会を設けるため。
            学園祭で頑張った有志団体の制作意欲を絶やさないため。
            自分の学校の生徒の良いところを知るため。
            MITAPROとして各有志団体や生徒が協力しあう機会を作るため。
            これらのためにMITAPRO映画祭を開催します。<br />
          </div>

          <div
            class="name pt-8"
            style="font-size:22px;font-family: sans-serif !important;"
          >
            二〇二一年十二月吉日 村上 翔哉
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { tab: "all" };
  }
};
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300);
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.all {
  height: 100%;
}

.all {
  background: radial-gradient(ellipse at top left, #334455 0%, #112233 100%);
  overflow: hidden;
}

.wrapper {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 400px;
  margin-left: -200px;
  font: 300 30px/1 "Open Sans Condensed", sans-serif;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  animation: 20s credits linear forwards;
}

.movie {
  margin-bottom: 50px;
  font-size: 50px;
}

.job {
  margin-bottom: 5px;
  font-size: 18px;
}

.name {
  margin-bottom: 50px;
  font-size: 35px;
}

@keyframes credits {
  0% {
    top: 100%;
  }

  100% {
    top: -363%;
  }
}
</style>
