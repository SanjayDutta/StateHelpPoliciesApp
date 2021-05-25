<template>
  <div>
    <DataStewardsNavBar></DataStewardsNavBar>
    <div class="dashbord-main">
      <b-container class="bv-example-row">
        <b-row class="justify-content-md-center">
          <b-col cols="10">
            <data-steward-upload-form
              :isLicense="this.isLicense"
              :para="this.para"
              :headTag="this.headTag"
            ></data-steward-upload-form>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import DataStewardsNavBar from "~/components/DataStewards/DataStewardsNavBar.vue";
import DataStewardUploadForm from "~/components/DataStewards/DataStewardUploadForm.vue";
export default {
  middleware: ["authHospital", "getOrgId"],
  components: {
    DataStewardsNavBar,
    DataStewardUploadForm,
  },
  data() {
    return {
      isLicense: true,
      para:
        "Upload the necessary documents, in the below mentioned format, to make it easier for sales representative to contact you.",
      headTag: "Upload Documents",
    };
  },
};
</script>

<style scoped>
.dashbord-main {
  padding: 2vw;
  background-color: #192332;
  color: black;
}
</style>