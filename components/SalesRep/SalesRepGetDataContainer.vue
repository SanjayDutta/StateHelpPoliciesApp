<template>
  <div>
    <!--<SalesRepSingleDataContainer
      v-for="item in loadedData"
      :key="item._id"
      :contentType="item.contentType"
      :email="item.email"
      :description="item.description"
      :mobileNo="item.mobileNo"
      :medicalInstitution="item.medicalInstitution"
    ></SalesRepSingleDataContainer>-->
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
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sort-icon-left
        :current-page="currentPage"
        @row-selected="onRowSelect"
      ></b-table>
    </div>
    <div class="table-remote">
      <b-pagination
        v-model="currentPage"
        :total-rows="loadedData.length"
        :per-page="perPage"
        aria-controls="tableSummary"
        align="center"
        pills
      ></b-pagination>
    </div>
    <div v-show="showTable" class="show-dataTable">
      <sales-rep-show-table :requirements="this.requirements"></sales-rep-show-table>
    </div>
  </div>
</template>
    
<script>
import SalesRepSingleDataContainer from "@/components/SalesRep/SalesRepSingleDataContainer.vue";
import SalesRepShowTable from "./SalesRepShowTable.vue";
export default {
  components: {
    SalesRepSingleDataContainer,
    SalesRepShowTable,
  },
  props: {
    loadedData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortBy: "uploadDate",
      sortDesc: false,
      showTable: false,
      requirements: null,
      currentPage: 1,
      perPage: 8,
      data: this.loadedData,
      sortParams: ["uploadDate", "medicalInstitution", "state"],

      fields: [
        { key: "_id", thClass: "d-none", tdClass: "d-none" },
        { key: "medicalInstitution" },
        { key: "description" },
        { key: "contentType" },
        { key: "email" },
        { key: "uploadDate" },
        { key: "state" },
        { key: "requirements", thClass: "d-none", tdClass: "d-none" },
        // userId: req.body.userId,
        // requirements: req.body.requirements
      ],
    };
  },
  methods: {
    onRowSelect(value) {
      this.showTable = true;
      this.requirements = value["0"];
    },
    filterIt() {
      if (this.filterByState != "none")
        this.tableInfo = this.tableInfo.filter(
          (element) => element.state === this.filterByState
        );
    },
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
          requirements: item.requirements,
        });
      });
      this.tableInfo = temp2;
      return temp2;
    },
  },
};
</script>

<style scoped>
.table-sub-container {
  box-shadow: 5px 5px 5px grey;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}
.table-remote {
  margin-top: 10px;
}
.show-dataTable {
  margin-top: 20px;
  margin-left: 2vw;
  margin-right: 2vw;
}
</style>