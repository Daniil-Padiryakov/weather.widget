<template>
  <weather-item :info="state.weatherInfo"></weather-item>
</template>

<script setup lang="ts">

import {onBeforeMount, onMounted, reactive, watch} from "vue";
import WeatherItem from './WeatherItem.ce.vue'
import {CurrentResponse} from "../types/CurrentResponse";
import {stub} from "../types/test";
import {WeatherInfoI} from "../types";
import {Widget} from "../entities/Widget";
import {LocalStorageA} from "../entities/LocalStorageA";
import {ServiceApi} from "../entities/ServiceApi";

const apiKey = '718e1d845dac45dade8082a07f5a4c31'

const state = reactive({
  weatherInfo: [] as WeatherInfoI[],
  latitude: 0,
  longitude: 0,
})

const api = new ServiceApi(apiKey);
const storage = new LocalStorageA();

onMounted(async () => {
  state.weatherInfo = storage.getState();
  if (state.weatherInfo.length === 0) {
    const getCords = async (position: { coords: { latitude: any; longitude: any; }; }) => {
      const { latitude, longitude } = position.coords;
      state.latitude = latitude;
      state.longitude = longitude;
    }
    navigator.geolocation.getCurrentPosition(getCords, console.log, {maximumAge: 0});
  }
})

watch(() => state.latitude, async (latitude) => {
  console.log(latitude)
  const initWeatherInfo = await api.getWeatherInfoByCords(state.latitude, state.longitude)
  console.log(initWeatherInfo)
  state.weatherInfo.push(initWeatherInfo)
  storage.setState(state.weatherInfo)
})




</script>
