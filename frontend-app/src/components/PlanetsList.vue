<script>
import { getPlanets } from '../services/PlanetService';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    // Planet,
  },
  data() {
    return {
      planets: [],
      title: 'Planets:',
    }
  },
  mounted() {
    console.log('planets mounted');
    this.planets = getPlanets();
    this.planets.then((res) => {
      this.planets = res;
    });
  },
  methods: {
    // 
  }
}


</script>

<template>
  <h1>{{ title }}</h1>
  <li v-for="(planet, index) in planets" :key="index">
    {{ planet.name }} - {{ index }}
  </li>
</template>

<style scoped></style>