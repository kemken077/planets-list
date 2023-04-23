<script>
export default {
  props: {
    text: String,
  },
  methods: {
    handleLoadClick() {
      this.$emit('loadClicked');
    }
  },
}
</script>

<template>
  <li class="load" @click="handleLoadClick">
    {{ text }}
  </li>
</template>

<style scoped>
.load {
  color: rgba(235, 235, 235, 0.64);
  background-color: #181818;
}
.load:hover {
  color: pink;
  border: 1px solid pink;
  background-color: transparent;
  padding: 20px 10px;
  cursor: pointer;
}
</style>