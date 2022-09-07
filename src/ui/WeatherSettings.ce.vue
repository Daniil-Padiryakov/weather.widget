<template>
  <div class="Settings">
    <div class="Settings__header">
      <div>Settings</div>
      <button @click="$emit('closeSettings')" class="btn btn-primary">Close</button>
    </div>

    <ul>
      <li class="Settings__item">
        <div>test</div>
        <div>name</div>
        <button class="btn btn-danger">delete</button>
      </li>
      <li class="Settings__item">
        <div>test</div>
        <div>name</div>
        <button class="btn btn-danger">delete</button>
      </li>
      <li class="Settings__item">
        <div>test</div>
        <div>name</div>
        <button class="btn btn-danger">delete</button>
      </li>
    </ul>

    <div class="Settings__new">
      <div>
        <label for="AddLocation">Add Location</label>
        <input v-model="state.nameCity" type="text" id="AddLocation">
      </div>
      <button @click="addNewLocation" class="Settings__new-btn btn btn-primary">Add</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {ServiceApi} from "../entities/ServiceApi";

const emit = defineEmits(['closeSettings', 'addNewLocationToState'])

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

</script>
