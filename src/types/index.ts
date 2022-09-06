export interface WeatherInfoI {
    id?: number,
    city: string,
    country: string,
    temp: number,
    tempFeels: number,
    weatherDesc: string,
    windSpeed: number,
    pressure: number,
    humidity: number,
    dewPoint: number,
    visibility: number,
}

export interface WeatherSettingsI {
    weatherLocation: WeatherInfoI[];
}

export interface StorageI {
    getState(): WeatherInfoI[];
    setState(data: WeatherInfoI[]): void;
}

export interface ServerI {
    getWeatherInfoByCords(lat: number, lon: number): Promise<WeatherInfoI>;
    getNewLocation(cityName: string): Promise<WeatherInfoI>;
}

export interface WidgetI {
    weatherInfo: WeatherInfoI[];
    storage: StorageI;
}
