<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col
        id="col-one"
        :style="{ backgroundImage: 'url(' + require(`@/assets/images/${backImg}`) + ')' }"
      >
        <div class="signInBox">
          <h1 class="mx-auto">{{ header }}</h1>
          <div class="box">
            <div>
              <authenticateBox></authenticateBox>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Jumbotron from "~/components/UI/jumbotron.vue";
import AuthenticateBox from "~/components/UI/authenticateBox.vue";

export default {
  components: {
    Jumbotron,
    AuthenticateBox,
  },
  props: {
    header: {
      type: String,
    },
    backImg: {
      type: String,
      default: "pexels-thisisengineering-3862365Before.jpg",
    },
  },
  data() {
    return {};
  },
  computed: {
    sendImgPath() {
      //console.log(this.backImg);
      return this.backImg;
    },
  },
};
</script>

<style scoped>
.mainBody {
  padding: 2vw;
  background-color: #0c1118;
}
.signInBox {
  display: grid;
  place-items: center;
}

.box {
  border-radius: 5px;
}
h1 {
  color: white;
  margin: 50px 100px;
  text-align: center;
}
.row {
  padding-top: 50px;
}
.col {
  margin-bottom: 50px;
  border-radius: 20px;
  height: 550px;
  opacity: 1;
}
#col-one {
  background-size: cover;
  height: 115%;
}
</style>
<!--

<b-col id="col-two">
        <div class="signInBox">
          <h1 class="mx-auto">{{ headingTwo }}</h1>
          <div class="box">
            <div>
              <authenticateBox></authenticateBox>
            </div>
          </div>
        </div>
      </b-col>

-->