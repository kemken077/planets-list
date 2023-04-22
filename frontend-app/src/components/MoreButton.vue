<script>
export default {
  props: {
    text: String,
  },
  methods: {
    handleMoreClick() {
      this.$emit('moreClicked');
    }
  },
}
</script>

<template>
  <li class="more" @click="handleMoreClick">
    {{ text }}
  </li>
</template>

<style scoped>
.more {
  color: rgba(235, 235, 235, 0.64);
  background-color: #181818;
}
.more:hover {
  color: pink;
  border: 1px solid pink;
  background-color: transparent;
  padding: 20px 10px;
  cursor: pointer;
}
</style>