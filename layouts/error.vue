<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">
        <i class="fab fa-phoenix-framework fa-2x"></i>
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="/">PhoeniX Connect</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="dashbord-main">
      <b-container class="bv-example-row">
        <b-row class="justify-content-md-center">
          <b-col cols="8">
            <h1>
              <i class="fab fa-phoenix-framework fa-8x"></i>
            </h1>
            <h1>Oops Something went wrong</h1>
            <p>An error occured, we're sorry</p>
            <b-button variant="warning" @click="$router.go(-1)">Go Back</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "Message Message",
    },
  },
};
</script>

<style>
.dashbord-main {
  padding: 10vw 5vw;
  background-color: #192332;
  color: white;
  border-radius: 0px;
  display: grid;
  place-items: center;
}

p {
  font-size: 20px;
}
</style>