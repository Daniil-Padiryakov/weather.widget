import {WeatherStorageServiceI} from "./ports";
import {LocalStorageAdapter} from "../services/LocalStorageAdapter";

export function useDeleteWeatherInfo() {
    const storage: WeatherStorageServiceI = new LocalStorageAdapter();

    return function deleteWeatherInfo(idWeatherInfo: number) {
        const weatherInfos = storage.getState();

        const newWeatherInfos = weatherInfos.filter(item => item.id !== idWeatherInfo);

        storage.setState([...newWeatherInfos]);

        return storage.getState();
    }
}
