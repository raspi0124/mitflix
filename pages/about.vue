<template>
  <div class="all">
    <div class="wrapper">
      <div class="movie">MITAPRO映画祭</div>
      <div class="job">統括プロデューサー</div>
      <div class="name">J2 Shoya Murakami</div>
      <div class="job">開発</div>
      <div class="name">S3 Junsei Miyazawa</div>
      <div class="job">開発</div>
      <div class="name">J2 Kaoru Nishihata</div>
      <div class="job">主催</div>
      <div class="name">MITAPRO</div>
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
  animation: 10s credits linear forwards;
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
    top: 0%;
  }
}
</style>
