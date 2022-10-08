import {WeatherInfoI} from "../types";

export interface WeatherServiceI {
    getWeatherInfoByCords(lat: number, lon: number): Promise<WeatherInfoI>;
    getNewLocationByName(cityName: string): Promise<WeatherInfoI>;
}

export interface WeatherStorageServiceI {
    getState(): WeatherInfoI[];
    setState(weatherInfo: WeatherInfoI[]): void;
    removeItemFromState(id: number): void;
}

export interface LocationServiceI {
    getCurrentLocation(): Promise<{ latitude: number, longitude: number }>;
}
