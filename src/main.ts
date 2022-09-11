import { createApp } from 'vue'
import './ui/style/style.scss'
import WeatherWidget from './ui/WeatherWidget.ce.vue'

createApp(WeatherWidget).mount('#app')

// import {defineCustomElement} from 'vue'
// import './ui/style/style.scss'
// import WeatherWidget from './ui/WeatherWidget.ce.vue'
//
// const WeatherWidgetElement = defineCustomElement({
//     // пока что я не нашел другого решения для добавления стилей
//     // @ts-ignore
//     ...WeatherWidget, styles: [`
// @import"https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css";@import"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css";.app{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:25%;font-family:Inter,sans-serif}.WeatherItem{max-width:300px;text-align:center;padding:10px}.WeatherItem__temp{font-style:normal;font-weight:600;font-size:36px;line-height:44px;color:#020826;margin-bottom:8px}.WeatherItem__geo{font-style:normal;font-weight:400;font-size:20px;line-height:24px;color:#020826;margin-bottom:8px}.WeatherItem__desc{font-style:normal;font-weight:400;font-size:14px;line-height:17px;color:#315a90;margin-bottom:24px}.WeatherItem__stat{display:flex;margin-bottom:24px;justify-content:space-between}.Settings{max-width:300px}.Settings__header{display:flex;justify-content:space-between;margin-bottom:15px}.Settings__item{display:flex;justify-content:space-between}.Settings__item:not(:last-child){margin-bottom:15px}.Settings__new{display:flex}.Settings__new-btn{align-self:flex-end}
//     `]
// })
//
// customElements.define('weather-widget', WeatherWidgetElement)
