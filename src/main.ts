import { createApp } from 'vue'
import './ui/style/style.scss'
import WeatherWidget from './ui/WeatherWidget.ce.vue'

createApp(WeatherWidget).mount('#app')

// import { defineCustomElement } from 'vue'
// import WeatherWidget from './WeatherWidget.ce.vue'
//
// const WeatherWidgetElement = defineCustomElement(WeatherWidget)
// customElements.define('weather-widget', WeatherWidgetElement)
