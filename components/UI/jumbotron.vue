<template>
  <b-jumbotron>
    <template #header>PhoeniX Connect</template>

    <div
      class="jumbo-intro"
    >PhoeniX Connect is a portal to connect pharmaceutical companies with various medical instituitions to fulfill the various requirements of the latter. Get access to various state licenses and documents quickly and easily.</div>

    <hr class="my-4" />

    <div class="jumbo-exit">Login to your respective domain to continue.</div>
  </b-jumbotron>
  <!--<div>
    <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000">
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=10"></b-carousel-slide>
    </b-carousel>
  </div>-->
</template>

<script>
export default {
  dat() {
    return {};
  },

  created() {},
};
</script>

<style>
.jumbotron {
  border-radius: 20px;
  background-color: black;
  color: white;
  background-image: url("~/assets/images/pexels-belle-co-1000445.jpg"),
    linear-gradient(to right, #0f0f0f, #0f0f0f);
  background-position: right 10px top;
  background-size: cover;
  background-repeat: no-repeat;
}

.jumbo-intro {
  font-size: 20px;
}

.jumbo-exit {
  font-size: 20px;
}
</style>