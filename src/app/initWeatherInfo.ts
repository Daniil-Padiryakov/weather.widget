import {LocationServiceI, WeatherServiceI, WeatherStorageServiceI} from "./ports";
import {LocationServiceAdapter} from "../services/LocationServiceAdapter";
import {WeatherServiceAdapter} from "../services/WeatherServiceAdapter";
import {LocalStorageAdapter} from "../services/LocalStorageAdapter";

export function useInitWeatherInfo() {
    const location: LocationServiceI = new LocationServiceAdapter();
    const storage: WeatherStorageServiceI = new LocalStorageAdapter();
    const api: WeatherServiceI = new WeatherServiceAdapter(storage);

    return async function initWeatherInfo() {
        const { latitude, longitude } = await location.getCurrentLocation();
        // handle user reject get info of coords

        const initWeatherInfo = await api.getWeatherInfoByCords(latitude, longitude);

        storage.setState([initWeatherInfo])

        return initWeatherInfo;
    }
}
