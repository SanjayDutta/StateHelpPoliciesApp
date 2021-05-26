<template>
  <div>
    <admin-navbar></admin-navbar>
    <div class="mainBody">
      <div class="header-content">
        <h1>Welcome</h1>
        <p>Phoenix Connect is a platform to upload/view/download all the various documents required by both Hosptal Data Stewards and Pharmacetucal Sales Reresentatives. This platform achieves this by being simple and quick. Get started by choosing one of the options below.</p>
        <p>
          As an
          <strong>Admin</strong> you can see all contents and user participating on this platform and also remove any user you deem unfit.
        </p>
      </div>
      <b-card-group deck>
        <a href="/admin/portal/registeredUsers/">
          <b-card
            title="Registered Users"
            bg-variant="warning"
            tag="article"
            style="max-width: 20rem;max-height:10rem;"
            class="mb-2"
          >
            <b-card-text>See all registered users registered on Phoenix Connect</b-card-text>
          </b-card>
        </a>

        <a href="/admin/portal/requirements/">
          <b-card
            title="See all Requirements"
            bg-variant="dark"
            style="max-width: 40rem;max-height:10rem;color:white;"
            img-top
          >
            <b-card-text>See all requirements uploaded by Medical Instituitions on Phoenix Connect</b-card-text>
          </b-card>
        </a>
      </b-card-group>

      <b-card-group deck>
        <a href="/admin/portal/documents/">
          <b-card
            title="See all Documents"
            bg-variant="dark"
            style="max-width: 40rem;color:white;"
            img-top
          >
            <b-card-text>See all documents and state licenses uploaded on Phoenix Connect</b-card-text>
          </b-card>
        </a>

        <b-card
          @click="logout"
          title="Logout"
          bg-variant="warning"
          style="max-width: 20rem;"
          tag="article"
          class="mb-2"
        >
          <b-card-text>Complety log out from PhoeniX Connect Portal</b-card-text>
        </b-card>
      </b-card-group>

      <b-card-group deck>
        <a href="/faq">
          <b-card
            title="FAQ"
            bg-variant="warning"
            tag="article"
            style="max-width: 20rem;max-height:10rem;"
            class="mb-2"
          >
            <b-card-text>Checkout our FAQ page to know how PhoeniX Connect works.</b-card-text>
          </b-card>
        </a>

        <a href="/terms">
          <b-card
            title="Terms and Conditions"
            bg-variant="dark"
            style="max-width: 40rem;max-height:10rem;color:white;"
            img-top
          >
            <b-card-text>Read our terms and conditions inorder to function properly as an Admin</b-card-text>
          </b-card>
        </a>
      </b-card-group>
    </div>
    <newfooter></newfooter>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import Newfooter from "../../../components/UI/newfooter.vue";
import HeaderInfo from "../../../components/UI/headerInfo.vue";
export default {
  components: {
    Newfooter,
    HeaderInfo,
  },
  middleware: "authAdmin",

  methods: {
    // goTo(url) {
    //   console.log(url);
    // },
    logout() {
      Cookie.set("access_token", "invalid");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
.header-content {
  color: white;
  margin-bottom: 15px;
}
.mainBody {
  padding: 2vw;
  display: grid;
  place-items: center;
  background-color: #1a2434;
  background-size: cover;

  text-decoration: none;
  color: black;
}

a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}
</style>