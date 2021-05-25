<template>
  <div>
    hello world
    <p>{{ contentType }}</p>me
  </div>
</template>

<script>
export default {
  props: { contentType: String },
};
</script>

<style scoped>
</style>