<script>
export default {
  props: {
    message: String,
  }
}
</script>

<template>
  <div class="loading">
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.loading p {
  color: #FFFFFF;
}
</style>