<template>
  <div>
    <div class="workarea-container">
      <SalesRepNavBar></SalesRepNavBar>
      <div class="intro-container">
        <h1>View licenses, state policies and more...</h1>
        <br />
        <p>Below data shows the various state policies, licenses documentation, facility-documents provided by various medical instituitions to make it easier for Sales Representative to access.</p>
        <p>Click on any row you desire to download all the files.</p>
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
import SalesRepNavBar from "~/components/SalesRep/SalesRepNavBar.vue";
import axios from "axios";

export default {
  components: {
    loadedAllData,
    SalesRepNavBar,
  },
  data() {
    return { loaded: [], temp: true };
  },
  methods: {
    showData() {},
  },
  async created() {
    return axios
      .get(process.env.BASE_URL + process.env.dbUrl + "getDocs/")
      .then((res) => {
        this.loaded = res.data;
        this.temp = false;
      })
      .catch((e) => {
        //console.log("error");
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