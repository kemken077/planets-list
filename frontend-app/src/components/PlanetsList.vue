<script>
import PlanetItem from './PlanetItem.vue';
import { getPlanets } from '../services/PlanetService';
import { isDataStoragePopulated } from '../services/SessionStorageService';

export default {
  components: {
    PlanetItem,
  },
  data() {
    return {
      planets: [],
      storageType: 'sessionStorage',
      storagePlanetsKey: 'planets',
      title: 'Planets:',
    }
  },
  methods: {
    loadPlanetsData() {
      if (isDataStoragePopulated(this.storageType)) {
        const parsed = JSON.parse(sessionStorage.getItem(this.storagePlanetsKey));
        this.planets = parsed;
      } else {
        const data = getPlanets();
        data.then((res) => {
          this.planets = res;
          const stringyfied = JSON.stringify(this.planets);
          sessionStorage.setItem(this.storagePlanetsKey, stringyfied);
        })
        .catch((e) => {
          console.error('Error: ', e);
        });
      }
    }
  },
  mounted() {
    this.loadPlanetsData();
  },
  computed: {
    isPlanetsArrayLengthLargerThanZero() {
      return this.planets ? this.planets.length > 0 : false;
    },
  },
}


</script>

<template>
  <h1>{{ title }}</h1>
  <div class="planets" v-if="isPlanetsArrayLengthLargerThanZero">
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