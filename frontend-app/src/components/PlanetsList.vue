<script setup>
import { ref, onMounted, computed } from 'vue';
import PlanetsGrid from './PlanetsGrid.vue';
import { getPlanets, getData } from '../services/PlanetService';
import { isDataStoragePopulated } from '../services/SessionStorageService';
import { useListStore } from '../stores/ListStore';

const store = useListStore();
var planets = ref([]);
const storageType = 'sessionStorage'
const storagePlanetsKey = 'planets';
const title =  'Planets:';
const loadingText = 'Loading...';

// computed
const isPlanetsArrayLengthLargerThanZero = computed(() => {
  return planets.value.length ? planets.value.length > 0 : false;
});

function getAvailableData() {
  console.log('Get available data...');
  const storage = sessionStorage.getItem(storagePlanetsKey);
  console.log({storage})
  planets = JSON.parse(storage);
}

function requestData() {
  console.log('Request data...');
  const data = getPlanets();
  data.then((res) => {
    planets = res.results;
    const stringyfied = JSON.stringify(planets);
    sessionStorage.setItem(storagePlanetsKey, stringyfied);
  })
  .catch((e) => {
    console.error('Error: ', e);
  });
}

function loadPlanetsData() {
  if (isDataStoragePopulated(storageType)) {
    getAvailableData();
  } else {
    requestData();
  }
}

onMounted(() => {
  loadPlanetsData();
});


// export default {
//   setup() {
//     const store = useListStore();

//     return {
//       store,
//     }
//   },
//   components: {
//     PlanetsGrid,
//   },
//   data() {
//     return {
//       planets: [],
//       storageType: 'sessionStorage',
//       storagePlanetsKey: 'planets',
//       title: 'Planets:',
//       loadingText: 'Loading...',
//     }
//   },
//   methods: {
//     getAvailableData() {
//       console.log('Get available data...');
//       const storage = sessionStorage.getItem(this.storagePlanetsKey);
//       this.planets = JSON.parse(storage);
//     },
//     requestData() {
//       console.log('Request data...');
//       const data = getPlanets();
//       data.then((res) => {
//         this.planets = res.results;
//         const stringyfied = JSON.stringify(this.planets);
//         sessionStorage.setItem(this.storagePlanetsKey, stringyfied);
//       })
//       .catch((e) => {
//         console.error('Error: ', e);
//       });
//     },
//     loadPlanetsData() {
//       if (isDataStoragePopulated(this.storageType)) {
//         this.getAvailableData();
//       } else {
//         this.requestData();
//       }
//     },
//     loadMorePlanets() {
//       console.log('Load more planets!');
//       const morePlanets = getData(this.nextUrl);
//       morePlanets.then((res) => {
//         try {
//           console.log('response OK...');
//           this.store.addItems(res.results);
//           this.store.setUrl(res.previous);
//           this.store.setUrl(res.next, false);
//         } catch (e) {
//           console.error('Error: ', e);
//         }
//       });
//     },
//   },
//   mounted() {
//     this.loadPlanetsData();
//   },
//   computed: {
//     isPlanetsArrayLengthLargerThanZero() {
//       return this.planets ? this.planets.length > 0 : false;
//     },
//   },
// }
</script>

<template>
  <h1>{{ title }}</h1>
  <div class="planets" v-if="isPlanetsArrayLengthLargerThanZero">
    <PlanetsGrid :items="planets" />
    <MoreButton @more-clicked="loadMorePlanets" :text="'+more'" />
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