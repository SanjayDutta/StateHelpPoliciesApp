<template>
  <div>
    <div class="workarea-container">
      <SalesRepNavBar></SalesRepNavBar>
      <header-info></header-info>
      <div class="work-area">
        <div class="cards-group">
          <b-container class="bv-example-row">
            <b-row>
              <b-col class="card-box" cols="12" md="4">
                <cards
                  title="Licenses and documents"
                  imgSrc="docs"
                  imgAlt="Documents"
                  text="Checkout all the licenses and documents etc provided by different medical facilities"
                  :url="docUrl"
                ></cards>
              </b-col>
              <b-col class="card-box" cols="12" md="4">
                <cards
                  title="Lastest Requirements"
                  imgSrc="hospital"
                  imgAlt="Requirements"
                  text="Checkout the latest requirements needed by medical facilities ranging from medicines, equipements, beds, etc"
                  :url="reqUrl"
                ></cards>
              </b-col>
              <b-col class="card-box" cols="12" md="4">
                <cards
                  title="See FAQ"
                  imgSrc="faq"
                  imgAlt="FAQ"
                  text="Get to know how to navigate on PhoeniX Connect works by reading our FAQ Page."
                  :url="faqUrl"
                ></cards>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cards from "../../components/UI/cards.vue";
import HeaderInfo from "../../components/UI/headerInfo.vue";
//title, imgSrc, imgAlt, text
export default {
  components: { cards, HeaderInfo },
  middleware: "authMedSalesRep",
  data() {
    return {
      docUrl: process.env.BASE_URL + "/workarea/documents",
      reqUrl: process.env.BASE_URL + "/workarea/requirements",
      faqUrl: process.env.BASE_URL + "/faq",
    };
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
