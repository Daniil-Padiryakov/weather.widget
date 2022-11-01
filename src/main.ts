// dev

import { createApp } from 'vue'
import css from './ui/style/style.scss'
import WeatherWidget from './ui/WeatherWidget.ce.vue'

createApp(WeatherWidget).mount('#app')

// build

// import {defineCustomElement} from 'vue'
// import WeatherWidget from './ui/WeatherWidget.ce.vue'
// import './ui/style/style.scss'
//
// const WeatherWidgetElement = defineCustomElement({
//     // пока что я не нашел другого решения для добавления стилей
//     // @ts-ignore
//     ...WeatherWidget, styles: [css]
// })
//
// customElements.define('weather-widget', WeatherWidgetElement)
