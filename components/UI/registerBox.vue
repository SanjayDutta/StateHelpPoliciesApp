<template>
  <div>
    <b-card-group v-if="!isInvalid">
      <b-card>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-role" label="Choose Domain:">
            <b-form-select id="input-role" v-model="form.role" :options="roles" required></b-form-select>
          </b-form-group>
          <div v-if="form.role === 'Hospital-Data Manager'">
            <b-form-group id="input-organisationId" label="Unique Hospital ID:">
              <b-form-input
                id="input-organisationId"
                type="text"
                v-model="form.organisationId"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-organisationName" label="Hospital Name:">
              <b-form-input
                id="input-organisationName"
                type="text"
                v-model="form.organisationName"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-organisationAdd" label="Hospital Address:">
              <b-form-input
                id="input-organisationAdd"
                type="text"
                v-model="form.organisationAdd"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div v-else>
            <b-form-group id="input-organisationId" label="Pharmacetucal Unique ID:">
              <b-form-input
                id="input-organisationId"
                type="text"
                v-model="form.organisationId"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-organisationName" label="Pharmacetucal Name:">
              <b-form-input
                id="input-organisationName"
                type="text"
                v-model="form.organisationName"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-organisationAdd" label="Pharmacetucal Address:">
              <b-form-input
                id="input-organisationAdd"
                type="text"
                v-model="form.organisationAdd"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <b-form-group id="input-fullName" label="Full Name:">
            <b-form-input
              id="input-fullName"
              type="text"
              v-model="form.fullName"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-dob" label="Date of Birth:">
            <b-form-input id="input-dob" type="date" v-model="form.dob" autocomplete="off" required></b-form-input>
          </b-form-group>

          <b-form-group id="input-email" label="Email address:">
            <b-form-input
              id="input-email"
              type="email"
              v-model="form.email"
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
          <b-button type="submit" variant="primary">Register</b-button>
          <b-button variant="dark" @click="switchLogin">Switch to Login</b-button>
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
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    switchLogin() {
      this.$store.state.isLogin = !this.$store.state.isLogin;
    },
    onSubmit() {
      axios
        .post(process.env.BASE_URL + "/api/register", {
          ...this.form,
        })
        .then((result) => {
          // console.log("Data inserted");
          const access_token = result.data.access_token;
          const organisationId = result.data.organisationId;
          Cookie.set("organisationId", organisationId);
          Cookie.set("access_token", access_token);
          this.$store.commit("setOrgId", organisationId);
          this.$store.commit("setToken", access_token);

          if (role === "Hospital-Data Manager") this.$router.push("/dashboard");
          else this.$router.push("/workarea");
        })
        .catch((e) => {
          this.isInvalid = true;
          //alert("Hello Vue Simple Alertthis");
        });
    },
    changeValidity() {
      this.isInvalid = !this.isInvalid;
    },
  },

  data() {
    return {
      headerMessage: "Invalid Credentials Provided",
      bodyMessage:
        "Looks like someone has already registered with the Credentials you provided. Please contact Admin if you would like to access the portal",
      isInvalid: false,
      roles: ["Hospital-Data Manager", "Medical Sale Representative"],
      form: {
        role: [],
        organisationId: "",
        organisationName: "",
        organisationAdd: "",
        email: "",
        password: "",
        fullName: "",
        dob: "",
      },
    };
  },
  props: {
    buttonColor: Boolean,
  },
};
</script>

<style>
.card {
  background-color: #6c757d;
  color: azure;
}
.alert-box {
  margin-top: 50px;
}
</style>