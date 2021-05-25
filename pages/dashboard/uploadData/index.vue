<template>
  <div>
    <DataStewardsNavBar></DataStewardsNavBar>
    <div class="dashbord-main">
      <b-container class="bv-example-row">
        <b-row class="justify-content-md-center">
          <b-col cols="8">
            <data-steward-upload-form
              :isLicene="this.isLicense"
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
      para:
        "Upload a list of items which your medical facility may need. Interested Medical Sales Repsentative may contact you after you complete this process.",
      headTag: "Upload Requirements",
      isLicense: false,
    };
  },
};
</script>

<style scoped>
.dashbord-main {
  padding: 2vw;
  background-color: #192332;
}
</style>