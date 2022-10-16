import {LocationServiceI, WeatherServiceI, WeatherStorageServiceI} from "./ports";
import {LocationServiceAdapter} from "../services/LocationServiceAdapter";
import {WeatherServiceAdapter} from "../services/WeatherServiceAdapter";
import {LocalStorageAdapter} from "../services/LocalStorageAdapter";

export function useInitWeatherInfo() {
    const location: LocationServiceI = new LocationServiceAdapter();
    const storage: WeatherStorageServiceI = new LocalStorageAdapter();
    const api: WeatherServiceI = new WeatherServiceAdapter(storage);

    return async function initWeatherInfo() {
        const state = storage.getState();

        if (state.length === 0) {
            try {
                const { latitude, longitude } = await location.getCurrentLocation();
                const initWeatherInfo = await api.getWeatherInfoByCords(latitude, longitude);
                storage.setState([initWeatherInfo])
                return [initWeatherInfo];
            } catch (e) {
                // add notification adapter
                alert('Для работы приложения разрешите использование геолокации')
            }
        } else {
            return state;
        }
    }
}
