import { WeatherInfoI} from "../domain/WeatherInfo";
import {WeatherServiceI, WeatherStorageServiceI} from "../app/ports";

export class WeatherServiceAdapter implements WeatherServiceI {
    private API_KEY: string = process.env.VITE_API_KEY ? process.env.VITE_API_KEY : '';
    private API_URL: string = process.env.VITE_API_URL ? process.env.VITE_API_URL : '';

    constructor(private storage: WeatherStorageServiceI) {}

    private async getWeatherDataByCords(lat: number, lon: number): Promise<WeatherInfoI> {
        return fetch(`${this.API_URL}data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${this.API_KEY}`)
            .then((res) => res.json())
            .then((data) => data)
    }

    private async getCordsByNameCity(cityName: string) {
        const response = await fetch(`${this.API_URL}geo/1.0/direct?q=${cityName}&limit=1&appid=${this.API_KEY}`)
            .then((res) => res.json())
            .then((data) => data[0])

        const {lat, lon} = response;

        return this.getWeatherDataByCords(lat, lon)
    }

    // todo refactor
    private async formatWeatherInfo(data: any): Promise<WeatherInfoI> {
        const state = this.storage.getState();
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
        const fullInfo = await this.getWeatherDataByCords(lat, lon);
        return this.formatWeatherInfo(fullInfo);
    }

    public async getNewLocationByName(cityName: string): Promise<WeatherInfoI> {
        const fullInfo = await this.getCordsByNameCity(cityName);
        return this.formatWeatherInfo(fullInfo);
    }
}
