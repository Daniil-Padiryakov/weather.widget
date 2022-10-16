<template>
  <div v-if="info" class="WeatherItem">
    <div class="WeatherItem__temp">{{ info.temp }}</div>

    <div class="WeatherItem__geo">
      <span>{{ `${info.city}, ${info.country}` }}</span>
    </div>

    <div class="WeatherItem__desc">
      <div class="app__temp">Feels like {{ info.tempFeels }}</div>
      <div class="app__temp">{{ info.weatherDesc }}</div>
    </div>

    <div class="WeatherItem__stat">
      <div>
        <div class="WeatherItem__stat_heading">Wind Speed</div>
        <div>{{ info.windSpeed }} m/s SSE</div>
      </div>

      <div>
        <div class="WeatherItem__stat_heading">Pressure</div>
        <div>{{ info.pressure }}hPa</div>
      </div>
    </div>

    <div class="WeatherItem__stat">
      <div>
        <div class="WeatherItem__stat_heading">Humidity</div>
        <div>{{ info.humidity }}%</div>
      </div>
      <div>
        <div class="WeatherItem__stat_heading">Grnd level</div>
        <div>{{ info.grndLevel }}C</div>
      </div>
      <div>
        <div class="WeatherItem__stat_heading">Visibility</div>
        <div>{{ info.visibility }}km</div>
      </div>
    </div>

    <div class="app__text"></div>
  </div>
</template>

<script setup lang="ts">
import {WeatherInfoI} from "../domain/WeatherInfo";

const {info} = defineProps<{ info: WeatherInfoI }>()
</script>
