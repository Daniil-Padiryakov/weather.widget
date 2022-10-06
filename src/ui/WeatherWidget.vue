<template>
  <div class="Weather-widget">
    <button v-if="!isSettingsOpen"
            @click="handlerShowSettings"
            class="Weather-widget__btn btn btn-primary">Settings
    </button>

    <weather-settings
        v-if="isSettingsOpen"
        :info="sortedItemInfo"
        @closeSettings="handlerShowSettings"
        @addNewLocationToState="setNewWeatherInfo"
        @deleteInfoWeather="deleteInfoWeather"
        @changeOrderItems="changeOrder"
    ></weather-settings>

    <weather-item
        v-if="!isSettingsOpen"
        v-for="info in sortedItemInfo"
        :key="info.id"
        :info="info">
    </weather-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherItem from './WeatherItem.ce.vue'
import WeatherSettings from './WeatherSettings.ce.vue'
import {WeatherInfoI} from "../types";
import {LocalStorageA} from "../services/LocalStorageA";
import {ServiceApi} from "../services/ServiceApi";
import {GeoLocation} from "../services/Location";

const storage = new LocalStorageA();
const api = new ServiceApi(storage);
const geo = new GeoLocation();

export default defineComponent({
  components: {
    WeatherItem,
    WeatherSettings
  },
  data() {
    return {
      weatherInfo: [] as WeatherInfoI[],
      latitude: 0,
      longitude: 0,
      isSettingsOpen: false,
      isInit: false,
    }
  },
  methods: {
    handlerShowSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },
    saveStateToLC(data: WeatherInfoI) {
      this.weatherInfo.push(data)
      storage.setState(data)
    },
    setNewWeatherInfo(newInfo: WeatherInfoI) {
      const infoWeatherWithSameId = this.weatherInfo.find(item => item.id === newInfo.id)
      if (infoWeatherWithSameId) {
        alert('This location is already added')
        return null
      }
      this.saveStateToLC(newInfo);
    },
    deleteInfoWeather(id: number) {
      this.weatherInfo = this.weatherInfo.filter(item => item.id !== id);
      storage.removeItemFromState(id)
    },
    changeOrder(item: WeatherInfoI, currentItem: WeatherInfoI) {
      this.weatherInfo = this.weatherInfo.map(infoItem => {
        if (infoItem.id === item.id) {
          return {...infoItem, order: currentItem.order}
        }
        if (infoItem.id === currentItem.id) {
          return {...infoItem, order: item.order}
        }
        return infoItem;
      })
    },
    sortItems(a: WeatherInfoI, b: WeatherInfoI) {
      if (a.order > b.order) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  computed: {
    sortedItemInfo() {
      return [...this.weatherInfo].sort(this.sortItems)
    }
  },
  watch: {
    async latitude(latitude) {
      if (this.weatherInfo.length === 0 && this.isInit) {
        const initWeatherInfo = await api.getWeatherInfoByCords(this.latitude, this.longitude)
        this.saveStateToLC(initWeatherInfo);
      }
      this.isInit = false;
    }
  },
  async mounted() {
    this.weatherInfo = storage.getState();
    if (this.weatherInfo.length === 0) {
      this.isInit = true;
      const {latitude, longitude} = await geo.getCurrentLocation().then(res => res)
      this.latitude = latitude;
      this.longitude = longitude;
    }
  }
})
</script>
