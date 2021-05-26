<template>
  <div>
    <b-form-group inline id="input-role" label="Sort By:">
      <b-form-select style="width:20vw;" v-model="sortBy" :options="sortParams"></b-form-select>
    </b-form-group>
    <div class="table-sub-container">
      <b-table
        id="tableSummary"
        hover
        selectable
        select-mode="single"
        bordered
        responsive
        :items="tableData"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        @row-selected="onRowSelect"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sort-icon-left
      ></b-table>
    </div>
    <div class="table-remote">
      <b-pagination
        v-model="currentPage"
        :total-rows="docs.length"
        :per-page="perPage"
        aria-controls="tableSummary"
        align="center"
        pills
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    docs: Array,
  },
  methods: {
    onRowSelect(value) {
      this.requirements = value["0"];
      const tableDatas = this.requirements["docs"];

      tableDatas.forEach((element) => {
        return axios
          .post(
            process.env.downloadUrl,
            {
              downloadContent: element,
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
      });
    },
  },
  data() {
    return {
      sortBy: "uploadDate",
      sortDesc: false,
      requirements: null,
      showTable: false,
      requirements: null,
      currentPage: 1,
      perPage: 8,
      data: this.docs,
      sortParams: ["uploadDate", "medicalInstitution", "state"],
      fields: [
        { key: "_id", thClass: "d-none", tdClass: "d-none" },
        { key: "uploadDate" },
        { key: "medicalInstitution" },
        { key: "state" },
        { key: "description" },
        { key: "contentType" },
        { key: "email" },
        { key: "noOfDocuments" },
        { key: "docs", thClass: "d-none", tdClass: "d-none" },
        // userId: req.body.userId,
        // requirements: req.body.requirements
      ],
    };
  },
  computed: {
    tableData() {
      const temp2 = [];
      this.data.forEach((item) => {
        temp2.push({
          _id: item._id,
          medicalInstitution: item.medicalInstitution,
          description: item.description,
          contentType: item.contentType,
          email: item.email,
          mobileNo: item.mobileNo,
          uploadDate: item.uploadDate,
          state: item.state,
          noOfDocuments: item.requirements.length,
          docs: item.requirements,
        });
      });
      return temp2;
    },
  },
};
</script>

<style>
.table-sub-container {
  box-shadow: 5px 5px 5px grey;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}

.table-container {
  padding: 2vw;
}
</style>