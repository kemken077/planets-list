import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useListStore = defineStore('list', {
  state: () => ({
    planets: [],
    prevUrl: '',
    nextUrl: '',
    requestResponseObjects: new Map(),
    storagePlanetsKey: 'planets',
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
      const stringyfied = JSON.stringify(items);
-     sessionStorage.setItem(this.storagePlanetsKey, stringyfied);
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
  }
});