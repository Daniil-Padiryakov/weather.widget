<template>
  <div v-if="info" class="WeatherItem">
    <div class="WeatherItem__temp">{{ info.temp }}</div>

    <div class="WeatherItem__geo">
      <span>{{ `${info.city}, ${info.country}` }}</span>
    </div>

    <div class="WeatherItem__desc">
      <div class="app__temp">feels like {{ info.tempDesc }}</div>
      <div class="app__temp">feels like {{ info.cloudsDesc }}</div>
      <div class="app__temp">feels like {{ info.windDesc }}</div>
    </div>

    <div class="WeatherItem__stat">
      <div>
        <div>windSpeed</div>
        <div>{{ info.windSpeed }} m/s SSE</div>
      </div>

      <div>
        <div>test</div>
        <div>feels like {{ info.test }}hPa</div>
      </div>
    </div>

    <div class="WeatherItem__stat">
      <div>
        <div>Humidity</div>
        <div>{{ info.humidity }}%</div>
      </div>
      <div>
        <div>Dew point</div>
        <div>{{ info.dewPoint }}C</div>
      </div>
      <div>
        <div>Visibility</div>
        <div>{{ info.visibility }}km</div>
      </div>
    </div>

    <div class="app__text"></div>
  </div>
</template>

<script setup lang="ts">
import {WeatherInfoI} from "../types";

const {info} = defineProps<{ info: WeatherInfoI }>()

// console.log(info)
</script>
