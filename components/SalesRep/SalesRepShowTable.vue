<template>
  <div class="main-table-container" v-if="requirements == null ? false : true">
    <div
      class="main-table-innerContainer"
      v-if="requirements['requirements'].length > 0 ? true : false"
    >
      <b-row>
        <b-col offset-md="10">
          <div class="download-button">
            <button @click="downloadDataSheet">Download</button>
          </div>
        </b-col>
      </b-row>

      <div class="main-table-showdata">
        <b-table small id="table-details" hover bordered responsive :items="tableData"></b-table>
      </div>
    </div>
    <div class="main-table-noData" v-else>
      <h3>No Excel sheet attached</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    requirements: {},
  },
  computed: {
    tableData() {
      return this.requirements["requirements"];
    },
  },
  methods: {
    downloadDataSheet() {
      console.log(this.requirements);
      return axios
        .post(
          process.env.downloadUrl,
          {
            downloadContent: this.tableData,
          },
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/vnd.ms-excel",
            })
          );
          const link = document.createElement("a");
          link.href = url;
          const date = new Date();
          const fileName =
            this.requirements["medicalInstitution"].split(" ").join("_") +
            "_" +
            this.requirements["uploadDate"];
          link.setAttribute("download", fileName + ".xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style >
.main-table-container {
  padding: 2vw;
}
.main-table-innerContainer {
  border: 2px solid black;
  border-radius: 20px;
}
.main-table-showdata {
  padding: 0 50px 0 50px;
}

.main-table-showdata table {
  background-color: white;
}
.row {
  margin-top: 20px;
}
.download-button button {
  border-radius: 20px;
  background-color: rgb(59, 248, 2);
  align-content: left;
  margin-bottom: 20px;
}
#tableSummary {
  background-color: rgb(255, 255, 255);
}
</style>