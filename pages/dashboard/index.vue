<template>
  <div>
    <data-stewards-nav-bar></data-stewards-nav-bar>
    <header-info></header-info>
    <div class="work-area">
      <div class="cards-group">
        <b-container class="bv-example-row">
          <b-row>
            <b-col class="card-box" cols="12" sm="6" md="4">
              <cards
                title="Upload licenses and documents"
                imgSrc="docs"
                imgAlt="Documents"
                text="Make it easier by uploading your licenses and documents"
                url="/dashboard/uploadDocs"
              ></cards>
            </b-col>
            <b-col class="card-box" cols="12" sm="6" md="4">
              <cards
                title="Upload Requirements"
                imgSrc="hospital"
                imgAlt="Requirements"
                text="Upload Hospital requirements ranging from medicines, equipements etc"
                url="/dashboard/uploadData"
              ></cards>
            </b-col>
            <b-col class="card-box" cols="12" sm="6" md="4">
              <cards
                title="See FAQ"
                imgSrc="faq"
                imgAlt="FAQ"
                text="Get to know how to navigate on PhoeniX Connect works by reading our FAQ Page."
                url="/faq"
              ></cards>
            </b-col>
            <b-col class="card-box" cols="12" sm="6" md="4">
              <cards
                title="View My Documents"
                imgSrc="mydocs"
                imgAlt="Documents"
                text="View your uploaded licenses and documents."
                url="/dashboard/myDocs"
              ></cards>
            </b-col>
            <b-col class="card-box" cols="12" sm="6" md="4">
              <cards
                title="View My Requirements"
                imgSrc="req"
                imgAlt="Profile"
                text="View all your uploaded requirement"
                url="/dashboard/myRequirements"
              ></cards>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import DataStewardsNavBar from "~/components/DataStewards/DataStewardsNavBar.vue";
import cards from "../../components/UI/cards.vue";
import HeaderInfo from "../../components/UI/headerInfo.vue";

export default {
  middleware: ["authHospital"],
  components: {
    DataStewardsNavBar,
    cards,
    HeaderInfo,
  },
  data() {
    return {
      orgId: this.$store.getters.getOrgId,
    };
  },
  created() {
    console.log("OrgID:" + this.$store.getters.getOrgId);
  },
};
</script>

<style>
.cards-group {
  margin-top: 20px;
  display: grid;
  place-items: center;
}

@media (max-width: 576px) {
  .cards-group {
    margin-left: 15vw;
  }
}
</style>