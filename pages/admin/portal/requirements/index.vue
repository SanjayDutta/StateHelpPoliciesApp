<template>
  <div>
    <admin-navbar></admin-navbar>
    <div class="workarea-container">
      <div class="intro-container">
        <h1>See Latest Requirements</h1>
        <br />
        <p>Below data shows the various requirements of medical institutions, like medicines, equipments, hospital-furniture etc.</p>
        <p>
          <b>Click on any row to download the requirement files.</b>
        </p>
        <hr />
      </div>
      <div v-if="loaded == null? false:true">
        <div class="table-container" v-if="loaded.length > 0">
          <sales-rep-get-data-container :loadedData="loaded"></sales-rep-get-data-container>
        </div>
      </div>
      <div v-else>
        <h1>No Requirements available now</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SalesRepNavBar from "~/components/SalesRep/SalesRepNavBar.vue";
import SalesRepGetDataContainer from "~/components/SalesRep/SalesRepGetDataContainer.vue";
import AdminNavbar from "../../../../components/admin/AdminNavbar.vue";
export default {
  components: {
    SalesRepNavBar,
    SalesRepGetDataContainer,
    AdminNavbar,
  },
  data() {
    return { loaded: [], temp: true };
  },
  async created() {
    console.log("Hello");
    console.log(this.$store.state.organisationId);
    axios
      .get(process.env.BASE_URL + process.env.dbUrl + "getAll/")
      .then((res) => {
        this.loaded = res.data;
        this.temp = false;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style>
sales-rep-get-data-container {
  border: 2px solid black;
}
.table-container {
  padding-left: 2vw;
  padding-right: 2vw;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.intro-container {
  padding: 2vw;
}
.intro-container p {
  font-size: 20px;
}
</style>