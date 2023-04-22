import { defineStore } from 'pinia';

export const useListStore = defineStore('list', {
  state: () => ({
    planets: [],
    prevUrl: '',
    nextUrl: '',
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
      const stringyfied = JSON.stringify(this.planets);
-     sessionStorage.setItem(this.storagePlanetsKey, stringyfied);
    },
    setUrl(url, isPrev = true) {
      if (isPrev) {
        this.prevUrl = url;
        sessionStorage.setItem('prevUrl', this.prevUrl);
      } else {
        this.nextUrl = url;
        sessionStorage.setItem('nextUrl', this.nextUrl);
      }
    },
    reset() {
      this.planets = [];
      this.prevUrl = '';
      this.nextUrl = '';
    }
  },
  getters: {
    currentItems(state) {
      return state.planets;
    } ,
    getNextUrl(state) {
      return state.nextUrl;
    },
    getPrevUrl(state) {
      return state.prevUrl;
    },
  }
});