<script setup>
import { onMounted, computed, ref } from 'vue';
import PlanetsGrid from './PlanetsGrid.vue';
import LoadButton from './LoadButton.vue';
import { getData } from '../services/PlanetService';
import { isDataStoragePopulated } from '../services/SessionStorageService';
import { useListStore } from '../stores/ListStore';

const store = useListStore();
const storageType = 'sessionStorage'
const title =  'Planets:';
const loadingText = 'Loading...';
const initialRequestUrl = 'https://swapi.dev/api/planets/';
const haveMorePlanetsToLoad = ref(true);
const havePreviousPlanetsToLoad = ref(false);

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

function checkForPrevAndNextUrls(noPreviousUrl, previous, noNextUrl, next) {
  if (noNextUrl) {
      haveMorePlanetsToLoad.value = false;
      console.warn(`Next page url = ${next}, can't make the request...`);
    } else {
      haveMorePlanetsToLoad.value = true;
    }
    if (noPreviousUrl) {
      havePreviousPlanetsToLoad.value = false;
      console.warn(`Previous page url = ${previous}, can't make the request...`);
    } else {
      havePreviousPlanetsToLoad.value = true;
    }
}

function makeRequest(url) {
  const data = getData(url);
  data.then((res) => {
    const { results, previous, next } = res;
    const noNextUrl =  !next || next === 'null'; // TODO: parse next to avoid checking against string value
    const noPreviousUrl = !previous || previous === 'null'; // TODO: parse next to avoid checking against string value
    checkForPrevAndNextUrls(noPreviousUrl, previous, noNextUrl, next);
    mutateState(results, previous, next);
  })
  .catch((e) => {
    console.error('Error: ', e);
  });
}

function requestData() {
  makeRequest(initialRequestUrl);
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
  havePreviousPlanetsToLoad.value = store.prevUrl.includes('https://'); // Check if store's prevUrl is populated with an actual URL.
});

</script>

<template>
  <h1>{{ title }}</h1>
  <div class="planets" v-if="isPlanetsArrayLengthLargerThanZero">
    <PlanetsGrid :items="planets" />
    <div class="more-wrapper" v-if="haveMorePlanetsToLoad">
      <LoadButton @load-clicked="makeRequest(store.nextUrl)" :text="'+more'" />
    </div>
    <div class="previous-wrapper" v-if="havePreviousPlanetsToLoad">
      <LoadButton @load-clicked="makeRequest(store.prevUrl)" :text="'-previous'" />
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