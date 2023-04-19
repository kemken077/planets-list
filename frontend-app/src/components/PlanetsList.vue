<script>
import PlanetItem from './PlanetItem.vue';
import { getPlanets } from '../services/PlanetService';

export default {
  components: {
    PlanetItem,
  },
  data() {
    return {
      planets: [],
      title: 'Planets:',
    }
  },
  mounted() {
    console.log('planets mounted');
    const data = getPlanets();
    data.then((res) => {
      this.planets = res;
      console.log(this.planets);
    })
    .catch((e) => {
      console.error('Error: ', e);
    });
  },
  methods: {
  }
}


</script>

<template>
  <h1>{{ title }}</h1>
  <div class="planets" v-if="planets.length > 0">
    <li v-for="(planet, index) in planets" :key="index">
      <PlanetItem :name="planet.name" />
    </li>
  </div>
  <div class="loading" v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
}
.loading p {
  color: #FFFFFF;
}
</style>