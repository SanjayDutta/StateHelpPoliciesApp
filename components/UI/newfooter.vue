<template>
  <div>
    <Nuxt />
    <footer>
      <b-container class="bv-example-row">
        <b-row class="infoRow">
          <b-col>
            <h6>
              <em>Created By- Sanjay Dutta</em>
              <p>Internship Project for TCS</p>
              <p>Resources of this project is meant to be shared with members associated with TCS.</p>
              <i class="fab fa-linkedin-in fa-2x"></i>
              <i class="fab fa-instagram fa-2x"></i>
              <i class="fab fa-facebook-square fa-2x"></i>
            </h6>
          </b-col>
          <b-col></b-col>
          <b-col>
            <p>Spport India in the fight against COVID-19</p>
            <a href="https://hemkuntfoundation.com/">
              <i class="fas fa-donate fa-2x"></i>
            </a>
            <a href="https://covid.giveindia.org/">
              <i class="fas fa-hand-holding-medical fa-2x"></i>
            </a>
            <a href="https://www.khalsaaid.org/">
              <i class="fas fa-hands-helping fa-2x"></i>
            </a>
          </b-col>
        </b-row>
        <br />
        <br />
        <b-row class="copyRightRow">
          <b-col>
            <p>Copyright © {{ year }} Phoenix Connect. All rights reserved</p>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>



<script>
export default {
  computed: {
    year() {
      const date = new Date();
      return date.getFullYear();
    },
  },
};
</script>


<style scoped>
.infoRow {
  text-align: left;
}
.copyRightRow {
  text-align: center;
}

footer {
  color: rgb(219, 219, 219);
  padding: 50px 50px 0px 50px;
  background-color: #05070a;
  height: 100%;
  width: 100%;
}
i {
  padding-right: 10px;
}
a {
  padding-right: 20px;
}
</style>

