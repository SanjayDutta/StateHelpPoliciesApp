<template>
  <div class="outside">
    <div class="inside">
      <h1>Welcome</h1>
      <p>Phoenix Connect is a platform to upload/view/download all the various documents required by both Hosptal Data Stewards and Pharmacetucal Sales Reresentatives. This platform achieves this byy being simple and quick. Get started by choosing one of the options below.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "User USer",
    },
  },
};
</script>

<style scoped>
.outside {
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 1vw;
}
.inside {
  font-size: 20px;
}
</style>