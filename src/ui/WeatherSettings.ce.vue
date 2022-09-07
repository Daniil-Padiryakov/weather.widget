<template>
  <div class="Settings">
    <div class="Settings__header">
      <div>Settings</div>
      <button @click="$emit('closeSettings')" class="btn btn-primary">Close</button>
    </div>

    <ul @drop=""
        @dragover.prevent
        @dragenter.prevent
        class="Settings__droppable">
      <li v-for="item in info"
          :key="item.id"
          @dragstart="onDragStart($event, item)"
          @drop.prevent="onDrop($event, item)"
          draggable="true"
          class="Settings__item Settings__item_draggable">
        <div>{{ item.city }}</div>
        <button @click="emit('deleteInfoWeather', item.id)" class="btn btn-danger">delete</button>
      </li>
    </ul>

    <div class="Settings__new">
      <div>
        <label for="AddLocation">Add Location</label>
        <input v-model="state.nameCity" type="text" id="AddLocation" placeholder="Enter the name of the city">
      </div>
      <button @click="addNewLocation" class="Settings__new-btn btn btn-primary">Add</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {ServiceApi} from "../services/ServiceApi";
import {WeatherInfoI} from "../types";

let {info} = defineProps<{ info: WeatherInfoI[] }>()
const emit = defineEmits([
  'closeSettings',
  'addNewLocationToState',
  'deleteInfoWeather',
  'changeOrderItems',
])
const apiKey = '718e1d845dac45dade8082a07f5a4c31'

const state = reactive({
  nameCity: '',
})

const api = new ServiceApi(apiKey);

const addNewLocation = async () => {
  const newWeatherInfo = await api.getNewLocation(state.nameCity);
  state.nameCity = '';
  emit('addNewLocationToState', newWeatherInfo);
}

let currentItem: WeatherInfoI;

const onDragStart = (e: DragEvent, item: WeatherInfoI) => {
  currentItem = item;
}

const onDrop = (e: DragEvent, item: WeatherInfoI) => {
  emit('changeOrderItems', item, currentItem);
}
</script>
