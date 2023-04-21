<script>
import PlanetsGrid from './PlanetsGrid.vue';
import { getPlanets } from '../services/PlanetService';
import { isDataStoragePopulated } from '../services/SessionStorageService';

export default {
  components: {
    PlanetsGrid,
  },
  data() {
    return {
      planets: [],
      storageType: 'sessionStorage',
      storagePlanetsKey: 'planets',
      title: 'Planets:',
      loadingText: 'Loading...',
    }
  },
  methods: {
    getAvailableData() {
      const storage = sessionStorage.getItem(this.storagePlanetsKey);
      this.planets = JSON.parse(storage);
    },
    requestData() {
      const data = getPlanets();
      data.then((res) => {
        this.planets = res;
        const stringyfied = JSON.stringify(this.planets);
        sessionStorage.setItem(this.storagePlanetsKey, stringyfied);
      })
      .catch((e) => {
        console.error('Error: ', e);
      });
    },
    loadPlanetsData() {
      if (isDataStoragePopulated(this.storageType)) {
        this.getAvailableData();
      } else {
        this.requestData();
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
    <PlanetsGrid :items="planets" />
  </div>
  <div class="loading" v-else>
    <p>{{ loadingText }}</p>
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