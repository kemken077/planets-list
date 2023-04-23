<script setup>
import { onMounted, computed, ref } from 'vue';
import PlanetsGrid from './PlanetsGrid.vue';
import MoreButton from './MoreButton.vue';
import { getData } from '../services/PlanetService';
import { isDataStoragePopulated } from '../services/SessionStorageService';
import { useListStore } from '../stores/ListStore';

const store = useListStore();
const storageType = 'sessionStorage'
const title =  'Planets:';
const loadingText = 'Loading...';
const initialRequestUrl = 'https://swapi.dev/api/planets/';
const haveMorePlanetsToLoad = ref(true);

// Computed
const planets = computed(() => {
  return store.planets;
});
const isPlanetsArrayLengthLargerThanZero = computed(() => {
  return store.planets.length > 0;
});

function mutateState(items, prevUrl, nextUrl) {
  store.addItems(items, true);
  store.setUrl(prevUrl);
  store.setUrl(nextUrl, false);
}

function getAvailableData() {
  const storage = store.getItems;
  const prevUrl = store.getPrevUrl;
  const nextUrl = store.getNextUrl;
  mutateState(JSON.parse(storage), prevUrl, nextUrl);
}

function makeRequest(url) {
  const data = getData(url);
  data.then((res) => {
    const { results, previous, next } = res;
    console.log({res});
    if (!next) { 
      haveMorePlanetsToLoad.value = false;
      console.warn(`Next page url = ${next}, can't make the request...`);
    }
    mutateState(results, previous, next);
  })
  .catch((e) => {
    console.error('Error: ', e);
  });
}

function requestData() {
  makeRequest(initialRequestUrl);
}

function loadMorePlanets() {
  const morePlanetsUrl = store.nextUrl;
  makeRequest(morePlanetsUrl);
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

</script>

<template>
  <h1>{{ title }}</h1>
  <div class="planets" v-if="isPlanetsArrayLengthLargerThanZero">
    <PlanetsGrid :items="planets" />
    <div class="more-wrapper" v-if="haveMorePlanetsToLoad">
      <MoreButton @more-clicked="loadMorePlanets" :text="'+more'" />
    </div>
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