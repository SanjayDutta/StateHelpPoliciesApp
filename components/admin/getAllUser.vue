<template>
  <div>
    <br />
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
      ></b-table>
    </div>
    <br />
    <div class="table-remote">
      <b-pagination
        v-model="currentPage"
        :total-rows="loadedUsers.length"
        :per-page="perPage"
        aria-controls="tableSummary"
        align="center"
        pills
      ></b-pagination>
    </div>
    <b-modal hide-footer v-model="modalShow" title="Successfully deleted">
      <a href="/admin/portal/registeredUsers">
        <b-button>Close</b-button>
      </a>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    loadedUsers: Array,
    tableName: String,
  },
  data() {
    return {
      modalShow: false,
      requirements: null,
      showTable: false,
      requirements: null,
      currentPage: 1,
      perPage: 8,
      data: this.docs,
      fields: [
        { key: "_id", thClass: "d-none", tdClass: "d-none" },
        { key: "organisationId" },
        { key: "fullName" },
        { key: "organisationName" },
        { key: "organisationAdd" },
        { key: "dob" },
        { key: "email" },
        // userId: req.body.userId,
        // requirements: req.body.requirements
      ],
    };
  },
  computed: {
    tableData() {
      const temp2 = [];
      this.loadedUsers.forEach((item) => {
        temp2.push({
          _id: item._id,
          email: item.email,
          fullName: item.fullName,
          organisationName: item.organisationName,
          dob: item.dob,
          organisationId: item.organisationId,
          organisationAdd: item.organisationAdd,
        });
      });
      return temp2;
    },
  },
  methods: {
    onRowSelect(value) {
      return axios
        .post("/api/admin/deleteUser/" + this.tableName, {
          _id: value["0"]._id,
        })
        .then((result) => {
          //console.log("yes");
          this.modalShow = true;
          //this.$emit("refresh-system", this.tableName);
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style>
div {
  border-radius: 20px;
}

#tableSummary {
  background-color: rgb(241, 234, 235);
}
.close {
  display: none;
}
</style>