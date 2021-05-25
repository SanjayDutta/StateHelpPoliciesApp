<template>
  <div>
    <b-card
      :title="this.title"
      :img-src="require(`~/assets/images/${this.imgSrc}.jpg`)"
      :img-alt="this.imgAlt"
      img-top
      tag="article"
      class="mb-2"
    >
      <b-card-text>{{ text }}</b-card-text>

      <b-button :href="this.url" variant="warning">Click</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    imgSrc: String,
    imgAlt: String,
    text: String,
    url: String,
  },
};
</script>

<style scoped>
.card {
  border-radius: 15px;
  box-shadow: 5px 5px 5px grey;
  max-width: 20rem;
  background-color: #343a40;
  color: white;
}
.card img {
  border-radius: 15px;
}
</style>