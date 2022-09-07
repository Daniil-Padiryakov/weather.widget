<template>
  <div class="Weather-widget">
    <button v-if="!state.isSettingsOpen"
            @click="handlerShowSettings"
            class="btn btn-primary Weather-widget__btn">Settings
    </button>

    <weather-settings
        v-if="state.isSettingsOpen"
        :info="sortedItemInfo"
        @closeSettings="handlerShowSettings"
        @addNewLocationToState="setNewWeatherInfo"
        @deleteInfoWeather="deleteInfoWeather"
        @changeOrderItems="changeOrder"
    ></weather-settings>

    <weather-item
        v-if="!state.isSettingsOpen"
        v-for="info in sortedItemInfo"
        :key="info.id"
        :info="info">
    </weather-item>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import WeatherItem from './WeatherItem.ce.vue'
import WeatherSettings from './WeatherSettings.ce.vue'
import {WeatherInfoI} from "../types";
import {LocalStorageA} from "../services/LocalStorageA";
import {ServiceApi} from "../services/ServiceApi";

const apiKey = '718e1d845dac45dade8082a07f5a4c31'
const api = new ServiceApi(apiKey);
const storage = new LocalStorageA();

const state = reactive({
  weatherInfo: [] as WeatherInfoI[],
  latitude: 0,
  longitude: 0,
  isSettingsOpen: false,
  isInit: false,
})

// methods
const handlerShowSettings = () => {
  state.isSettingsOpen = !state.isSettingsOpen;
}

const saveStateToLC = (data: WeatherInfoI) => {
  state.weatherInfo.push(data)
  storage.setState(data)
}

const setNewWeatherInfo = (newInfo: WeatherInfoI) => {
  const infoWeatherWithSameId = state.weatherInfo.find(item => item.id === newInfo.id)
  if (infoWeatherWithSameId) {
    alert('This location is already added')
    return null
  }
  saveStateToLC(newInfo);
}

const deleteInfoWeather = (id: number) => {
  state.weatherInfo = state.weatherInfo.filter(item => item.id !== id);
  storage.removeItemFromState(id)
  console.log(state.weatherInfo)
}

const changeOrder = (item: WeatherInfoI, currentItem: WeatherInfoI) => {
  state.weatherInfo = state.weatherInfo.map(infoItem => {
    if (infoItem.id === item.id) {
      return {...infoItem, order: currentItem.order}
    }
    if (infoItem.id === currentItem.id) {
      return {...infoItem, order: item.order}
    }
    return infoItem;
  })
}

const sortItems = (a: WeatherInfoI, b: WeatherInfoI) => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
}

const sortedItemInfo = computed(() => {
  return [...state.weatherInfo].sort(sortItems)
})

// vue methods
watch(() => state.latitude, async (latitude) => {
  if (state.weatherInfo.length === 0 && state.isInit) {
    console.log('watch')
    const initWeatherInfo = await api.getWeatherInfoByCords(state.latitude, state.longitude)
    saveStateToLC(initWeatherInfo);
  }
  state.isInit = false;
})

onMounted(async () => {
  state.weatherInfo = storage.getState();
  if (state.weatherInfo.length === 0) {
    state.isInit = true;
    const getCords = async (position: { coords: { latitude: any; longitude: any; }; }) => {
      const {latitude, longitude} = position.coords;
      state.latitude = latitude;
      state.longitude = longitude;
    }
    navigator.geolocation.getCurrentPosition(getCords, console.log, {maximumAge: 0});
  }
})

</script>
