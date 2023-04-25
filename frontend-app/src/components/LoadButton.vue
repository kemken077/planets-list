<script>
export default {
  props: {
    text: String,
    isDisabled: Boolean,
  },
  methods: {
    handleLoadClick() {
      this.$emit('loadClicked');
    }
  },
}
</script>

<template>
  <li class="load" :class="{ disabled: isDisabled }" @click="handleLoadClick">
    {{ text }}
  </li>
</template>

<style scoped>
.load {
  color: rgba(235, 235, 235, 0.64);
  background-color: #181818;
  height: 100px;
  padding: 20px 10px;
}
.load:hover {
  color: pink;
  border: 1px solid pink;
  background-color: transparent;
  cursor: pointer;
}

.load.disabled {
  cursor: not-allowed;
  pointer-events: none;
  padding: 20px 10px;
  opacity: 0.5;
}
</style>