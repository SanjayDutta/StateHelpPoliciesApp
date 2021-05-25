<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">
          <i class="fab fa-phoenix-framework fa-2x"></i>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/dashboard">Dashboard</b-nav-item>
            <b-nav-item href="/dashboard/requirements">Requirements</b-nav-item>
            <b-nav-item href="/dashboard/documents">Documents</b-nav-item>
            <b-nav-item href="#">FAQ</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item @click="logout" right>Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  methods: {
    logout() {
      Cookie.set("access_token", "invalid");
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>
