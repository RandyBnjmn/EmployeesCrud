<template>
  <div class="center">
    <h1 class="indigo lighten-5">{{ title }}</h1>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
    },
  };
</script>

<style scoped>
  h1 {
    /* margin: 10px, 0px, 0px, 0px; */
    border-radius: 15px;
    padding: 10px;
  }
</style>
