<script>
import { toRaw } from 'vue';
import PlanetItem from '../components/PlanetItem.vue';
export default {
  components: {
    PlanetItem,
  },
  props: {
    items: Array,
  },
  data() {
    return {
      shouldShow: false,
      currentItem: null,
    }
  },
  computed: {
    getCurrentItemData() {
      let markup = `<h1 class="close">X</h1>`;
      if (this.currentItem) {
        const raw = toRaw(this.currentItem);
        const getMarkup = (prop, value) => `<span class="item ${prop}"><h1 class="prop">${prop}:</h1><h3 class="value">${value}</h3></span>`;
        for (const prop in raw) {
          if (prop === 'created' || prop === 'edited') {
            const formattedDate = new Date(raw[prop]).toLocaleDateString('en-US');
            markup += getMarkup(prop, formattedDate); // format dates.
          } else {
            markup += getMarkup(prop, raw[prop]);
          }
        }
      }
      return markup;
    }
  },
  mounted() {
    // console.log(this.items);
  },
  methods: {
    handleClick(event, planet) {
      const clickedPlanetData = toRaw(planet);
      this.shouldShow = true;
      this.currentItem = clickedPlanetData;
    },
    closeSideBar() {
      this.shouldShow = false;
    }
  }
}
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="index" @click="handleClick(event, item)">
      <PlanetItem :name="item.name" />
    </li>
  </ul>
  <div class="current-item" v-html="getCurrentItemData" :class="{ show: shouldShow, hide: !shouldShow }" @click="closeSideBar"></div>
</template>

<style scoped>
ul {
  width: 100%;
  list-style-type: none;
}
li {
  color: pink;
}
li:hover {
  background-color: pink;
  color: #181818;
  cursor: pointer;
}
/* Animations */
@keyframes in {
  0% {
    right: -370px;
    display: flex;
  }
  100% {
    right: 0;
  }
}
@-webkit-keyframes in {
  0% {
    right: -370px;
  }
  100% {
    right: 0;
  }
}
/* End animations */
.current-item {
  flex-direction: column;
  width: 70%;
  max-width: 280px;
  max-height: 100%;
  margin: 0;
  outline: 0;
  transform: translateX(0);
  left: auto;
  right: 0;
  display: none;
  position: fixed;
  top: 0;
  height: 100vh;
  background-color: #181818;
  color: pink;
  border-left: 1px dotted pink;
  border-bottom: 1px dotted pink;
  border-top: 1px dotted pink;
  z-index: 9999;
  padding: 5px 0 20px 5px;
  overflow-y: scroll;
}
.current-item.hide {
  display: none;
}
.current-item.show {
  display: flex;
  position: absolute;
  -webkit-animation: ease-in-out;
  -webkit-animation-name: in;
  -webkit-animation-duration: 0.5s;
  animation: ease-in-out ;
  animation-name: in;
  animation-duration: 0.5s;
}
.current-item::v-deep hr {
  border-color: pink;
  margin-bottom: 10px;
}
.current-item::v-deep h1.close {
  font-size: 48px;
  padding-left: 20px;
  margin-top: 0;
  margin-left: 0;
}
.current-item::v-deep h1.close:hover {
  cursor: pointer;
  background-color: pink;
  color: #181818;
}
.current-item::v-deep h1 {
  text-transform: lowercase;
  font-size: 14px;
  margin-bottom: 0;
  padding-bottom: 0;
}
.current-item::v-deep h3 {
  color: white;
  font-size: 18px;
}
.current-item::v-deep .value {
  font-size: 14px;
  font-weight: bold;
}
.current-item::v-deep .item {
  padding-left: 10px;
  margin-bottom: 10px;
  border-bottom: 1px dotted pink;
}
</style>
