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
import {useDeleteWeatherInfo} from "../app/deleteWeatherInfo";
import {useAddWeatherInfo} from "../app/addWeatherInfo";
import { LocalStorageAdapter } from "../services/LocalStorageAdapter";
import {useInitWeatherInfo} from "../app/initWeatherInfo";

const storage = new LocalStorageAdapter();

const initWeatherInfo = useInitWeatherInfo();
const deleteWeatherInfo = useDeleteWeatherInfo();
const addWeatherInfo = useAddWeatherInfo();

export default defineComponent({
  components: {
    WeatherItem,
    WeatherSettings
  },
  data() {
    return {
      weatherInfo: [] as WeatherInfoI[],
      isSettingsOpen: false,
    }
  },
  methods: {
    handlerShowSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },

    async setNewWeatherInfo(cityName: string) {
      const newWeatherInfo = await addWeatherInfo(cityName);
      if (newWeatherInfo) {
        this.weatherInfo.push(newWeatherInfo)
      }
    },
    deleteInfoWeather(id: number) {
      this.weatherInfo = deleteWeatherInfo(id);
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
  async mounted() {
    this.weatherInfo = storage.getState();

    if (this.weatherInfo.length === 0) {
      const newWeatherInfo = await initWeatherInfo();
      this.weatherInfo.push(newWeatherInfo);
    }
  }
})
</script>
