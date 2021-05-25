<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/" right>
          <em>Home</em>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="mainBody">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h1>Admin</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="!isInvalid">
            <b-card-group>
              <b-card>
                <b-form @submit.prevent="onSubmit">
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
                  <b-button type="submit" variant="primary">Login</b-button>
                </b-form>
              </b-card>
            </b-card-group>
          </b-col>
          <b-col v-else>
            <div class="alert-box">
              <b-card>
                <h3>
                  {{ headerMessage }}
                  <i class="fas fa-times"></i>
                </h3>

                <b-card-text>{{ bodyMessage }}</b-card-text>
                <b-button @click="changeValidity" variant="primary">OK</b-button>
              </b-card>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <b-row>
          <b-col>
            <h1>What is Phoenix Connect?</h1>
            <p></p>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <NewFooter></NewFooter>
  </div>
</template>

<script>
import axios from "axios";
import NewFooter from "../../components/UI/newfooter.vue";
import Cookie from "js-cookie";

export default {
  components: {
    NewFooter,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      headerMessage: "Invalid Email/Password",
      bodyMessage:
        "Looks like you entered the wrong email or password. Click 'OK' to try again",
      isInvalid: false,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form.email);
      console.log(this.form.password);
      console.log("http://localhost:3000/api/admin/");

      axios
        .post("http://localhost:3000/api/admin", {
          email: this.form.email,
          password: this.form.password,
          role: "Admin",
        })
        .then((result) => {
          console.log("yes");
          // console.log(result.data.access_token);
          // const access_token = result.data.access_token;
          // const organisationId = result.data.organisationId;
          console.log(result.data.secretId);
          Cookie.set("access_token", result.data.secretId);
          this.$store.commit("setToken", result.data.secretId);
          this.$router.push("/admin/portal");
          // Cookie.set("access_token", access_token);
          // this.$store.commit("setOrgId", organisationId);
          // console.log(this.$store.state.organisationId);
          // this.$store.commit("setToken", access_token);
          // console.log(access_token);
          // if (this.type === "HospitalDataManager") {
          //   console.log("yes");
          //   this.$router.push("/dashboard");
          // } else this.$router.push("/workarea");
        })
        .catch((e) => (this.isInvalid = true));
    },
    changeValidity() {
      this.isInvalid = !this.isInvalid;
    },
  },
};
</script>

<style scoped>
.mainBody {
  padding: 2vw;
  background-image: linear-gradient(#223044, #0c1118);
}

h1 {
  color: white;
  margin: 50px 100px;
  text-align: center;
}
</style>


