<template>
  <div>
    <b-card>
      <h1>{{ headTag }}</h1>
      <p>{{ para }}</p>
      <b-form @submit.prevent="onSubmit">
        <b-form-group v-if="!isLicense" label="Description" label-for="descrptionInput">
          <b-form-input
            id="descriptionInput"
            v-model="form.description"
            type="text"
            placeholder="Enter some details about your requirements."
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-else label="Description" label-for="descrptionInput">
          <b-form-input
            id="descriptionInput"
            v-model="form.description"
            type="text"
            placeholder="Enter some details about the documents."
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group v-if="!isLicense" label="Content Type" label-for="contentTypeInput">
          <b-form-input
            id="contentTypeInput"
            v-model="form.contentType"
            type="text"
            placeholder="E.g. Medicines/Equipments/etc"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-else label="Document Type" label-for="contentTypeInput">
          <b-form-input
            id="contentTypeInput"
            v-model="form.contentType"
            type="text"
            placeholder="E.g. License Lists,Certificate Lists etc"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Mobile Number" label-for="mobileNoInput">
          <b-form-input
            id="mobileNoInput"
            v-model="form.mobileNo"
            type="text"
            placeholder="+91"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email" label-for="emailInput">
          <b-form-input
            id="emailInput"
            v-model="form.email"
            type="email"
            placeholder="johndoe@mail.com"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Medical Instituition Name" label-for="medicalInstitutionInput">
          <b-form-input
            id="medicalInstitutionInput"
            v-model="form.medicalInstitution"
            type="text"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="State" label-for="statesInput">
          <b-form-select
            v-model="form.state"
            :options="states"
            id="statesInput"
            class="mb-2 mr-sm-2 mb-sm-0"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group
          v-if="!isLicense"
          label="Please Upload the required documents in the (.xls, .xlsx, .csv) formats"
        >
          <b-form-file required v-model="file" class="mt-3" plain accept=".xls, .xlsx, .csv"></b-form-file>
          <em>
            <b>Please Note:</b> You can only upload a single file in the above mentioned formats only. Make sure you label your coloumns name appropriately, else it may lead to rendering error, which in turn may make your submissions invalid.
          </em>

          <br />
        </b-form-group>

        <b-form-group
          v-else
          label="Please Upload the required documents in the (.xls, .xlsx, .csv) formats"
        >
          <b-form-file
            multiple
            v-model="tempfile"
            class="mt-3"
            plain
            accept=".xls, .xlsx, .csv"
            required
          ></b-form-file>
          <em>
            <b>Please Note:</b> You can upload multiple files but in the above mentioned formats only. Make sure you label your coloumns name appropriately, else it may lead to rendering error, which in turn may make your submissions invalid.
          </em>
        </b-form-group>
        <div
          v-if="showError"
          style="color:red;"
        >Looks like you have entered a file of wrong format. Please check again.</div>
        <br />

        <b-button :disabled="isDisable" type="submit" variant="dark">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import XLSX from "xlsx";

export default {
  watch: {
    file(val) {
      console.log("----Single file---");
      var valid = true;
      if (
        val.type === "application/vnd.ms-excel" ||
        val.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        this.isDisable = false;
        if (val) {
          let fileReader = new FileReader();
          fileReader.readAsBinaryString(val);
          fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            workbook.SheetNames.forEach((sheet) => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(
                workbook.Sheets[sheet]
              );
              //console.log(rowObject);
              this.extractedDataOther.push(...rowObject);
            });
          };
        }
      } else {
        {
          valid = false;
        }
      }

      if (!valid) {
        console.log("One of the files you have given is wrong");
        this.showError = true;
        this.isDisable = true;
        return;
      } else {
        this.isDisable = false;
        this.showError = false;
      }
    },
    tempfile(val) {
      var valid = true;
      val.every(async (element) => {
        if (
          element.type != "application/vnd.ms-excel" &&
          element.type !=
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          valid = false;
          return false;
        }
      });
      if (!valid) {
        console.log("One of the files you have given is wrong");
        this.showError = true;
        this.isDisable = true;
        return;
      } else {
        this.isDisable = false;
        this.showError = false;
      }
      val.forEach(async (element) => {
        const secondArray = [];
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(element);
        fileReader.onload = (event) => {
          let data = event.target.result;
          let workbook = XLSX.read(data, { type: "binary" });
          workbook.SheetNames.forEach(async (sheet) => {
            let rowObject = await XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheet]
            );
            this.extractedData.push({ rowObject });
            //secondArray.push({ rowObject });
            //console.log("----second-----");
            //console.log(secondArray);
          });
        };
        //this.extractedData.push({ secondArray });
      });
    },
  },
  props: {
    isLicense: {
      type: Boolean,
    },
    para: String,
    headTag: String,
  },
  data() {
    return {
      showError: false,
      organisationId: String,
      tempfile: [],
      extractedData: [],
      extractedDataOther: [],
      isDisable: true,
      file: null,
      form: {
        description: "",
        contentType: "",
        mobileNo: "",
        medicalInstitution: "",
        email: "",
        state: "",
      },
      states: [
        "Andaman And Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadra And Nagar Haveli",
        "Daman And Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu And Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
      ],
    };
  },
  methods: {
    async onSubmit() {
      const date = new Date();
      const month = date.getUTCMonth();
      const year = date.getFullYear();
      const day = date.getUTCDate();
      const fullDate = day + "/" + month + "/" + year;
      //console.log(this.extractedData);
      console.log(this.$store.state.organisationId);
      if (!this.isLicense)
        this.$store.dispatch("upload", {
          ...this.form,
          uploadDate: fullDate,
          organisationId: this.$store.getters.getOrgId,
          token: this.$store.state.token,
          requirements: this.extractedDataOther,
        });
      else {
        console.log("Extracted");
        console.log(this.$store.state.organisationId);
        const getToken = this.$store.state.token.split(" ")[1];
        this.$store
          .dispatch("uploadData", {
            ...this.form,
            uploadDate: fullDate,
            organisationId: this.$store.getters.getOrgId,
            token: this.$store.state.token,
            requirements: this.extractedData,
          })
          .then(() => {
            //if there is an error
            //console.log("Get Back");
            this.$nuxt.error({ statusCode: 404, message: "err message" });
          });
      }
    },
  },
};
</script>

<style>
</style>