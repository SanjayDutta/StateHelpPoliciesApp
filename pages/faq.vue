<template>
  <div back>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">
        <i class="fab fa-phoenix-framework fa-2x"></i>
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="/">PhoeniX Connect</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="main-body">
      <div class="content">
        <h1 class="content-header">Getting Started</h1>
        <div class="content-text">
          <p>Welcome to PhoeniX Connect, a simple and an easy platform to connect Medical Sales Representatives with medical institutions.</p>
          <p>
            Medical Sales Representatives have to abide by the state policies. In order to get those details they refer to the policy documents which are currently stored de-centrally in multiple repositories in excel format and is managed by Data Stewards/Hospital Data Managers.
            It is becoming challenging for Hospital Data Managers to manage multiple repositories, While for Sales Rep, it is time taking task to connect with multiple data stewards over mail to get the documents
          </p>
          <p>To overcome this problem, PhoeniX Connect enables a quick and hassle free solution. It is a web based solution, envisioned to provide a unified platform for Sales Rep to get the necessary medical state policies documents with intuitive UI, which has features like filtering, Graphical UI.</p>
        </div>
      </div>
      <div class="content">
        <h1 class="content-header">How to Use PhoeniX Connect?</h1>
        <div class="content-text">
          <b-button
            v-on:click="onClickOne()"
            size="lg"
            v-b-toggle="'collapse-1'"
            class="m-1"
            :variant="this.buttonColorOne ? 'warning' : 'dark'"
          >Data Stewards/Hospital Data Managers</b-button>
          <b-button
            v-on:click="onClickTwo()"
            size="lg"
            v-b-toggle="'collapse-2'"
            class="m-1"
            :variant="this.buttonColorTwo ? 'warning' : 'dark'"
          >Medical Sales Representative</b-button>
          <b-collapse id="collapse-1">
            <br />
            <p>
              <u>Data Stewards/Hospital Data Manger</u>
              <section>As a Data Steward, you can upload all your provisioned state licenses, documents, certificates etc. You can view all your uploads from the 'View Documents' tab. Along with this you can sort all the documents provided to increase understandibility.</section><section>Along with this, we have 'Upload Requirements' which enables you to upload any medicinal requirements, which can be viewed by Sales Representatives. This was made to make it easier and quicker to procure vital medicines. You can use this for other requirements too, like equipments, devices etc</section><br>
              <section>Click on the <b>Switch to Register</b> button and fill up the details. After completion, click on Register button. You will be automatocally logged in</section>
            </p>
          </b-collapse>
          <b-collapse id="collapse-2">
            <br />
            <p>
              <u>Medical Sales Representative</u>
              <section>As a Medical Sales Representative, you can view all the licenses and documents provided by medical instituitions. You can download all the files provided by them and keep them locally.</section>
              <section>You can also view urgent requirements of these medical insitutions and provide them with the necessary, if possible. The require list is also downloadable.</section>
              <br>
              <section>Click on the <b>Switch to Register</b> button and fill up the details. After completion, click on Register button. You will be automatocally logged in</section>
            </p>
          </b-collapse>
        </div>
      </div>
      <div class="content">
        <h1 class="content-header">Terms and Conditions</h1>
        <div class="content-text">
          <terms-component></terms-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import termsComponent from '../components/termsComponent.vue';
export default {
  components: { termsComponent },
  data() {
    return {
      buttonColorOne: false,
      buttonOne: false,
      buttonColorTwo: false,
      buttonTwo: false,
    };
  },
  methods: {
    onClickOne() {
      if (!this.buttonOne) {
        this.buttonColorOne = true;
        this.buttonOne = true;
        if (this.buttonColorTwo) {
          this.$root.$emit("bv::toggle::collapse", "collapse-2");
          this.buttonColorTwo = false;
          this.buttonTwo = false;
        }
      } else {
        this.buttonColorOne = false;
        this.buttonOne = false;
      }
    },
    onClickTwo() {
      if (!this.buttonTwo) {
        this.buttonColorTwo = true;
        this.buttonTwo = true;
        if (this.buttonColorOne) {
          this.$root.$emit("bv::toggle::collapse", "collapse-1");
          this.buttonColorOne = false;
          this.buttonOne = false;
        }
      } else {
        this.buttonColorTwo = false;
        this.buttonTwo = false;
      }
    },
  },
};
</script>

<style>
.main-body {
  background-image: linear-gradient(#223044, #0c1118);
  color: white;
  height: 100%;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 1000;
  padding: 3vw 5vw;
}
.content {
  margin-bottom: 75px;
}
.content-text {
  font-size: 20px;
  margin: 30px 20px;
}
.collapse-1 {
  margin-top: 100px;
}
</style>

