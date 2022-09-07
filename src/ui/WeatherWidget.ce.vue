<template>
  <button v-if="!state.isSettingsOpen"
          @click="handlerShowSettings"
          class="btn btn-primary">Settings
  </button>

  <weather-settings
      v-if="state.isSettingsOpen"
      :info="state.weatherInfo"
      @closeSettings="handlerShowSettings"
      @addNewLocationToState="setNewWeatherInfo"
      @deleteInfoWeather="deleteInfoWeather"
  ></weather-settings>

  <weather-item
      v-if="!state.isSettingsOpen"
      v-for="info in state.weatherInfo"
      :info="info">
  </weather-item>
</template>

<script setup lang="ts">
import {onMounted, reactive, watch} from "vue";
import WeatherItem from './WeatherItem.ce.vue'
import WeatherSettings from './WeatherSettings.ce.vue'
import {WeatherInfoI} from "../types";
import {LocalStorageA} from "../entities/LocalStorageA";
import {ServiceApi} from "../entities/ServiceApi";

const apiKey = '718e1d845dac45dade8082a07f5a4c31'

const state = reactive({
  weatherInfo: [] as WeatherInfoI[],
  latitude: 0,
  longitude: 0,
  isSettingsOpen: false,
})

const handlerShowSettings = () => {
  state.isSettingsOpen = !state.isSettingsOpen;
}

const api = new ServiceApi(apiKey);
const storage = new LocalStorageA();

onMounted(async () => {
  state.weatherInfo = storage.getState();
  if (state.weatherInfo.length === 0) {
    const getCords = async (position: { coords: { latitude: any; longitude: any; }; }) => {
      const {latitude, longitude} = position.coords;
      state.latitude = latitude;
      state.longitude = longitude;
    }
    navigator.geolocation.getCurrentPosition(getCords, console.log, {maximumAge: 0});
  }
})

const saveStateToLC = (data: WeatherInfoI) => {
  state.weatherInfo.push(data)
  storage.setState(data)
}

watch(() => state.latitude, async (latitude) => {
  const initWeatherInfo = await api.getWeatherInfoByCords(state.latitude, state.longitude)
  saveStateToLC(initWeatherInfo);
})

const setNewWeatherInfo = (newInfo: WeatherInfoI) => {
  saveStateToLC(newInfo);
}

const deleteInfoWeather = (id: number) => {
  state.weatherInfo = state.weatherInfo.filter(item => item.id !== id);
  storage.removeItemFromState(id)
}

</script>
