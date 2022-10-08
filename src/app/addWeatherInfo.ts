import {WeatherServiceI, WeatherStorageServiceI} from "./ports";
import {LocalStorageAdapter} from "../services/LocalStorageAdapter";
import {WeatherServiceAdapter} from "../services/WeatherServiceAdapter";

export function useAddWeatherInfo() {
    const storage: WeatherStorageServiceI = new LocalStorageAdapter();
    const api: WeatherServiceI = new WeatherServiceAdapter(storage);

    return async function addWeatherInfo(cityName: string) {
        const newWeatherInfo = await api.getNewLocationByName(cityName);

        const weatherInfos = storage.getState();

        const infoWeatherWithSameId = weatherInfos.find(item => item.id === newWeatherInfo.id)

        // add notification adapter
        if (infoWeatherWithSameId) {
            alert('This location is already added')
            return null
        }

        storage.setState([...weatherInfos, newWeatherInfo]);

        return newWeatherInfo;
    }
}
