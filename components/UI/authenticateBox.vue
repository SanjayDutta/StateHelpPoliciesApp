<template>
  <div>
    <b-button-group size="lg">
      <b-button
        :variant="this.buttonColor ? 'warning' : 'dark'"
        @click="changeColor"
        v-if="this.isLogin"
      >Hospital Data Manager</b-button>
      <b-button
        :variant="!this.buttonColor ? 'light' : 'dark'"
        @click="changeColor"
        v-if="this.isLogin"
      >Medical Sales Representative</b-button>
      <b-button v-else>Register to Phoenix Connect</b-button>
    </b-button-group>

    <login-box v-if="isLogin" :buttonColor="this.buttonColor"></login-box>
    <register-box id="register" v-else :buttonColor="this.buttonColor"></register-box>
  </div>
</template>

<script>
import LoginBox from "./loginBox.vue";
import RegisterBox from "./registerBox.vue";
export default {
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  components: {
    LoginBox,
    RegisterBox, //b-card
  },
  data() {
    return {
      header: "Login",
      headerTag: "header",
      footer: "Card Footer",
      footerTag: "footer",
      title: "Title",
      buttonColor: true,
      goSomewhere: "Login",
      email: "",
      password: "",
    };
  },
  methods: {
    changeColor(text) {
      this.buttonColor = !this.buttonColor;
      if (this.buttonColor) this.goSomewhere = "Login";
      else this.goSomewhere = "Register";
    },
    onSubmit() {
      console.log(this.email);
      console.log(this.password);
    },
  },
};
</script>

<style>
div {
  bottom: 20px;
}
#register {
  width: 50vw;
}
</style>