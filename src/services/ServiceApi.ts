import {ServerI, WeatherInfoI} from "../types";
import {LocalStorageA} from "./LocalStorageA";

export class ServiceApi implements ServerI {
    constructor(private API_KEY: string) {}

    private async getCordsByNameCity(cityName: string) {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.API_KEY}`)
            .then((res) => res.json())
            .then((data) => data[0])

        const {lat, lon} = response;

        return fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${this.API_KEY}`)
            .then((res) => res.json())
            .then((data) => data)
    }

    private async formatWeatherInfo(data: any): Promise<WeatherInfoI> {
        const storage = new LocalStorageA;
        const state = storage.getState();
        let nextOrder = 1;

        for (let i = 0; i < state.length; i++) {
            if (state[i].order >= nextOrder) {
                nextOrder = state[i].order;
                nextOrder++;
            }
        }
        return {
            id: data.id,
            order: nextOrder,
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            tempFeels: data.main.feels_like,
            weatherDesc: data.weather[0].description,
            windSpeed: data.wind.speed,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            grndLevel: data.main.grnd_level,
            visibility: data.visibility,
        }
    }

    public async getWeatherInfoByCords(lat: number, lon: number): Promise<WeatherInfoI> {
        const fullInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${this.API_KEY}`)
            .then((res) => res.json())
            .then((data) => data)
        return this.formatWeatherInfo(fullInfo);
    }

    public async getNewLocation(cityName: string): Promise<WeatherInfoI> {
        const fullInfo = await this.getCordsByNameCity(cityName);
        return this.formatWeatherInfo(fullInfo);
    }
}
