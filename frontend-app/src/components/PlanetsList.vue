<script setup>
import { onMounted, computed, ref } from 'vue';
import PlanetsGrid from './PlanetsGrid.vue';
import LoadButton from './LoadButton.vue';
import LoadingMessage from './LoadingMessage.vue';
import { getData } from '../services/PlanetService';
import { isDataStoragePopulated } from '../services/SessionStorageService';
import { useListStore } from '../stores/ListStore';

const store = useListStore();
const storageType = 'sessionStorage'
const title =  'Planets:';
const initialRequestUrl = 'https://swapi.dev/api/planets/';
const haveMorePlanetsToLoad = ref(true);
const havePreviousPlanetsToLoad = ref(false);
const areCTAButtonDisabled = ref(false);
const isLoading = ref(false);
const totalPages = 6;

// Computed
const planets = computed(() => {
  return store.planets;
});
const isPlanetsArrayLengthLargerThanZero = computed(() => {
  return store.planets.length > 0;
});

function mutateState(items, prevUrl, nextUrl, checkForCurrentPage = false) {
  store.addItems(items, true);
  store.setUrl(prevUrl);
  store.setUrl(nextUrl, false);
  if (checkForCurrentPage) {
    store.setCurrentPage(sessionStorage.getItem('currentPage'));
  }
}

function getAvailableData() {
  const storage = JSON.parse(sessionStorage.getItem('planets'));
  const prevUrl = sessionStorage.getItem('prevUrl');
  const nextUrl = sessionStorage.getItem('nextUrl');
  mutateState(storage, prevUrl, nextUrl, true); // Hydrate state with sessionStorage data on page reload.
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
  areCTAButtonDisabled.value = true;
  data.then((res) => {
    const { results, previous, next } = res;
    const noNextUrl =  !next || next === 'null'; // TODO: parse next to avoid checking against string value
    const noPreviousUrl = !previous || previous === 'null'; // TODO: parse next to avoid checking against string value
    checkForPrevAndNextUrls(noPreviousUrl, previous, noNextUrl, next);
    mutateState(results, previous, next);
    areCTAButtonDisabled.value = false;
    isLoading.value = false;
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
    isLoading.value = true;
    requestData();
  }
}

function getPreviousPlanets() {
  makeRequest(store.prevUrl);
  const pageNumber = Number(store.getCurrentPage) - 1
  store.setCurrentPage(pageNumber);
}

function getNextPlanets() {
  makeRequest(store.nextUrl);
  const pageNumber = Number(store.getCurrentPage) + 1;
  store.setCurrentPage(pageNumber);
}

function urlIncludesProtocol(protocol, prev = true) {
  const url = prev ? store.prevUrl : store.nextUrl;
  return url.includes(protocol);
}

onMounted(() => {
  loadPlanetsData();
  havePreviousPlanetsToLoad.value = urlIncludesProtocol('https://'); // Check if store's prevUrl is populated with an actual URL.
  haveMorePlanetsToLoad.value = urlIncludesProtocol('https://', false); // Check if store's nextUrl is populated with an actual URL.
});

</script>

<template>
  <h1>{{ title }} (<span class="current-page">{{ store.getCurrentPage }}</span> / <span class="total-pages">{{ totalPages }}</span>)</h1>
  <div class="loading-wrapper" v-if="isLoading">
    <LoadingMessage :message="'Loading...'" />
  </div>
  <div class="loaded-wrapper" v-else>
    <div class="planets" v-if="isPlanetsArrayLengthLargerThanZero">
      <PlanetsGrid :items="planets" />
      <div class="more-wrapper" v-if="haveMorePlanetsToLoad">
        <LoadButton :isDisabled="areCTAButtonDisabled" @load-clicked="getNextPlanets" :text="'next ->'" />
      </div>
      <div class="previous-wrapper" v-if="havePreviousPlanetsToLoad">
        <LoadButton :isDisabled="areCTAButtonDisabled" @load-clicked="getPreviousPlanets" :text="'<- previous'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 30px;
  border-bottom: 1px solid pink;
}
h1 .current-page {
  color: white;
  font-weight: bold;
}
.more-wrapper {
  margin-top: 30px;
}
</style>