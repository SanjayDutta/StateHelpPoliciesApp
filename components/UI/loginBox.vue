<template>
  <div>
    <b-card-group v-if="!isInvalid">
      <b-card
        :style="[this.buttonColor ? {backgroundColor: '#ffc107',color:'#000000'} : {backgroundColor: '#ffffff',color:'#000000'}]"
      >
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-orgId" label="Unique Id:">
            <b-form-input
              id="input-orgId"
              type="text"
              v-model="form.orgId"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-password" label="Password:">
            <b-form-input
              id="input-password"
              type="password"
              v-model="form.password"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Login</b-button>
          <b-button variant="dark" @click="switchLogin">Switch to Register</b-button>
        </b-form>
      </b-card>
    </b-card-group>
    <div v-else class="alert-box">
      <b-card>
        <h3>
          {{ headerMessage }}
          <i class="fas fa-times"></i>
        </h3>

        <b-card-text>{{ bodyMessage }}</b-card-text>
        <b-button @click="changeValidity" variant="primary">OK</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      type: "HospitalDataManager",
      form: {
        orgId: "",
        password: "",
      },
      headerMessage: "Invalid Email/Password",
      bodyMessage:
        "Looks like you entered the wrong email or password. Click 'OK' to try again",
      isInvalid: false,
    };
  },
  watch: {
    buttonColor() {
      if (this.buttonColor) this.type = "HospitalDataManager";
      else this.type = "SalesRep";
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  props: {
    buttonColor: Boolean,
  },
  methods: {
    changeValidity() {
      this.isInvalid = !this.isInvalid;
    },
    switchLogin() {
      this.$store.state.isLogin = !this.$store.state.isLogin;
    },
    onSubmit() {
      console.log(this.form.email);
      console.log(this.form.password);
      console.log("http://localhost:3000/api/login/" + this.type);
      let addedRole = "";
      if (this.buttonColor) addedRole = "Hospital-Data Manager";
      else addedRole = "Medical Sale Representative";
      console.log(addedRole);
      axios
        .post("http://localhost:3000/api/login/" + this.type, {
          organisationId: this.form.orgId,
          password: this.form.password,
          role: addedRole,
        })
        .then((result) => {
          console.log("yes");
          console.log(result.data.access_token);
          const access_token = result.data.access_token;
          const organisationId = result.data.organisationId;
          Cookie.set("organisationId", organisationId);
          Cookie.set("access_token", access_token);
          this.$store.commit("setOrgId", organisationId);
          console.log(this.$store.state.organisationId);
          this.$store.commit("setToken", access_token);
          console.log(access_token);
          if (this.type === "HospitalDataManager") {
            console.log("yes");
            this.$router.push("/dashboard");
          } else this.$router.push("/workarea");
        })
        .catch((e) => (this.isInvalid = true));
    },
  },
};
</script>

<style>
.alert-box {
  margin-top: 50px;
  z-index: 5;
}
</style>