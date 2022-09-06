import {StorageI, WeatherInfoI, WidgetI} from "../types";

export class Widget implements WidgetI {
    storage: StorageI;
    weatherInfo: WeatherInfoI[];

    constructor(storage: StorageI, weatherInfo: WeatherInfoI[]) {
        this.storage = storage;
        this.weatherInfo = weatherInfo;
    }
}
