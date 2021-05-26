<template>
  <div>
    <b-navbar variant="dark">
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/faq" right>
          <em>FAQ</em>
        </b-nav-item>
        <b-nav-item href="/admin" right>
          <em>Admin</em>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="mainBody">
      <jumbotron></jumbotron>
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <authenticate-background header="Login/Register"></authenticate-background>
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <b-row>
          <b-col>
            <h1>What is Phoenix Connect?</h1>
            <p>PhoeniX Connect’ is a web-based application developed to connect Medical Sales Representatives with Data Stewards in a quick and simple manner. The web app enables users to upload documents and maintain them in an organized manner, download the necessary reports, provision of an authorization and authentication system for users and an admin portal to control the content on the platform.</p>
            <p>
              Furthermore, Data Stewards can upload requirement lists (like a list of medicines/medical equipment urgently needed). Sales Representatives can access this list to serve the former quickly.
              Along with the above features, special care has been taken to make sure the user has a smooth experience while using this application.
            </p>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <NewFooter></NewFooter>
  </div>
</template>

<script>
import Jumbotron from "../components/UI/jumbotron.vue";
import AuthenticateBackground from "../components/UI/authenticateBackground.vue";
import NewFooter from "../components/UI/newfooter.vue";

export default {
  components: {
    AuthenticateBackground,
    Jumbotron,
    NewFooter,
  },
  data() {
    return {
      backImgOne: "pexels-thisisengineering-3862365Before.jpg",
      backImgTwo: "pexels-thirdman-5327585Before.jpg",
    };
  },
};
</script>

<style scoped>
em {
  color: white;
}
.mainBody {
  padding: 2vw;
  background-image: linear-gradient(#223044, #0c1118);
}

.box {
  background-color: black;
  border: 2px solid black;
  border-radius: 5px;
}
h1 {
  color: white;
  margin: 50px 100px;
  text-align: center;
}
p {
  color: white;
}
</style>


