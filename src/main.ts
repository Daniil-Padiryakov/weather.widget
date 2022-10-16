// dev

import { createApp } from 'vue'
import './ui/style/style.scss'
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
//     ...WeatherWidget, styles: [`
//         .btn-primary{background-color:#1652f0;border:1px solid #1652F0;border-radius:4px;box-sizing:border-box;color:#fff;cursor:pointer;font-family:Graphik,-apple-system,system-ui,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;line-height:1.15;overflow:visible;padding:12px 16px;position:relative;text-align:center;text-transform:none;transition:all 80ms ease-in-out;user-select:none;-webkit-user-select:none;touch-action:manipulation;width:fit-content}.btn-primary:disabled{opacity:.5}.btn-primary:focus{outline:0}.btn-primary:hover{background-color:#0a46e4;border-color:#0a46e4}.btn-primary:active{background-color:#0039d7;border-color:#0039d7}.btn-danger{background-color:#f0003c;border:none;border-radius:4px;box-sizing:border-box;color:#fff;cursor:pointer;font-family:Graphik,-apple-system,system-ui,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;line-height:1.15;overflow:visible;padding:12px 16px;position:relative;text-align:center;text-transform:none;transition:all 80ms ease-in-out;user-select:none;-webkit-user-select:none;touch-action:manipulation;width:fit-content}.btn-danger:hover{background-color:#da0137}.Weather-widget{font-family:Inter,sans-serif}.Weather-widget__btn{margin-bottom:10px}.WeatherItem{max-width:300px;text-align:center;padding:10px;background-color:#f5f5f5;border-radius:20px}.WeatherItem:not(:last-child){margin-bottom:15px}.WeatherItem__temp{font-weight:600;font-size:36px;line-height:44px;color:#020826;margin-bottom:8px}.WeatherItem__geo{font-size:20px;line-height:24px;color:#020826;margin-bottom:8px}.WeatherItem__desc{font-size:14px;line-height:17px;color:#315a90;margin-bottom:24px}.WeatherItem__stat{display:flex;margin-bottom:24px;justify-content:space-between}.WeatherItem__stat_heading{font-weight:600}.Settings{max-width:300px}.Settings__header{display:flex;justify-content:space-between;margin-bottom:15px}.Settings__item{display:flex;justify-content:space-between;background-color:#f5f5f5;padding:10px;border-radius:10px}.Settings__item:not(:last-child){margin-bottom:15px}.Settings__new{display:flex}.Settings__new-btn{align-self:flex-end}
//     `]
// })
//
// customElements.define('weather-widget', WeatherWidgetElement)
