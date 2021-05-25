<template>
  <div>
    <admin-navbar></admin-navbar>
    <div class="mainBody">
      <div class="work-area">
        <div class="intro-container">
          <h1>View All Users</h1>
          <br />
          <p>Below list all the users registered on Phoenix Connect. Click on 'Open' to see the users.</p>
          <p>
            Click on any row to
            <b>DELETE</b> the user from the database.
          </p>

          <hr />
        </div>
        <div class="actors">
          <h1>Hospital Data Managers</h1>
          <b-button @click="getAllUsers('hdmanagers')" variant="success">Open</b-button>
          <b-button @click="closeOne" variant="danger">Close</b-button>
          <get-all-user
            v-if="!tempOne"
            :loadedUsers="loadedUsersHDM"
            tableName="hdmanagers"
            @refresh-system="refreshSystem"
          ></get-all-user>
        </div>
        <hr />
        <br />
        <div class="actors">
          <h1>Medical Sales Representative</h1>
          <b-button @click="getAllUsers('medsalesreps')" variant="success">Open</b-button>
          <b-button @click="closeTwo" variant="danger">Close</b-button>
          <get-all-user v-if="!tempTwo" :loadedUsers="loadedUsersMSR" tableName="medsalesreps">></get-all-user>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GetAllUser from "../../../../components/admin/getAllUser.vue";
import axios from "axios";
import AdminNavbar from "../../../../components/admin/AdminNavbar.vue";

export default {
  middleware: "authAdmin",
  components: {
    GetAllUser,
    AdminNavbar,
  },
  data() {
    return {
      loadedUsersHDM: [],
      loadedUsersMSR: [],
      tempOne: true,
      tempTwo: true,
    };
  },
  methods: {
    refreshSystem(type) {
      this.modalShow = true;
      // this.$router.push("/admin/portal");
      this.getAllUsers("hdmanagers");
    },
    closeOne() {
      this.tempOne = true;
    },
    closeTwo() {
      this.tempTwo = true;
    },
    getAllUsers(text) {
      console.log("cliked");
      if (text === "hdmanagers") {
        return axios
          .get("http://localhost:3000/api/admin/" + "gethdmanagers")
          .then((res) => {
            this.loadedUsersHDM = res.data;
            this.tempOne = false;
          })
          .catch((e) => {
            console.log("error");
            console.log(e);
          });
      } else {
        return axios
          .get("http://localhost:3000/api/admin/" + "getmedsalesrep")
          .then((res) => {
            this.loadedUsersMSR = res.data;
            this.tempTwo = false;
          })
          .catch((e) => {
            this.$router.push("/error");
          });
      }
    },
  },
};
</script>

<style>
.intro-container {
  padding: 2vw;
}
.intro-container p {
  font-size: 20px;
}
.actors {
  padding: 2vw;
}
</style>