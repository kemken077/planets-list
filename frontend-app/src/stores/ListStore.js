import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useListStore = defineStore('list', {
  state: () => ({
    planets: [],
    prevUrl: '',
    nextUrl: '',
    storagePlanetsKey: 'planets',
    currentPage: 1,
  }),
  actions: {
    addItems(items, resetWithNewValues = false) {
      if (resetWithNewValues) {
        this.planets = items;
      } else {
        items.forEach((item) => {
          this.planets.push(item);
        });
      }
-     sessionStorage.setItem(this.storagePlanetsKey, JSON.stringify(items));
    },
    setUrl(url, isPrev = true) {
      if (isPrev) {
        this.prevUrl = url;
        sessionStorage.setItem('prevUrl', url);
      } else {
        this.nextUrl = url;
        sessionStorage.setItem('nextUrl', url);
      }
    },
    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      sessionStorage.setItem('currentPage', pageNumber);
    },
    reset() {
      this.planets = [];
      this.prevUrl = '';
      this.nextUrl = '';
    }
  },
  getters: {
    getItems: (state) => toRaw(state.planets),
    getNextUrl: (state) => state.nextUrl,
    getPrevUrl: (state) => state.prevUrl,
    getCurrentPage: (state) => state.currentPage,
  }
});