<script>
import PlanetItem from '../components/PlanetItem.vue';
import MoreButton from '../components/MoreButton.vue';
export default {
  components: {
    PlanetItem,
    MoreButton,
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
    <MoreButton :text="'+more'" />
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