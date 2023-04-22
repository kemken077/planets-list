<script>
import PlanetItem from '../components/PlanetItem.vue';
export default {
  components: {
    PlanetItem,
  },
  props: {
    items: Array,
  },
  mounted() {
    console.log(this.items);
  },
}
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <PlanetItem :name="item.name" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style-type: none;
}
li {
  color: pink;
}
li:hover {
  background-color: pink;
  color: #181818;
  cursor: pointer;
}
</style>