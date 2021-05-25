<template>
  <div>
    <div class="workarea-container">
      <DataStewardsNavBar></DataStewardsNavBar>
      <div class="intro-container">
        <h1>My Documents,Licenses, Reports</h1>
        <br />
        <p>Click on any row to download the files.</p>
        <hr />
      </div>

      <loadedAllData class="table-container" v-if="!temp" :docs="loaded"></loadedAllData>
      <div v-else>
        <h1>No Requirements available now</h1>
      </div>
    </div>
  </div>
</template>

<script>
import loadedAllData from "@/components/loadedAllData.vue";
import axios from "axios";

export default {
  middleware: ["authHospital", "getOrgId"],
  components: {
    loadedAllData,
  },
  data() {
    return { loaded: [], temp: true };
  },
  methods: {
    showData() {},
  },
  async created() {
    //console.log("Hello");
    //console.log(this.$store.state.organisationId);
    console.log(
      process.env.dbUrl + "getDocs/" + this.$store.state.organisationId
    );
    axios
      .get(process.env.dbUrl + "getDocs/" + this.$store.state.organisationId)
      .then((res) => {
        this.loaded = res.data;
        this.temp = false;
        console.log("ran");
      })
      .catch((e) => {
        console.log("error man");
        console.log(e);
      });
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
</style>