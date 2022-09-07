export interface WeatherInfoI {
    id: number,
    order: number,
    city: string,
    country: string,
    temp: number,
    tempFeels: number,
    weatherDesc: string,
    windSpeed: number,
    pressure: number,
    humidity: number,
    grndLevel: number,
    visibility: number,
}

export interface StorageI {
    getState(): WeatherInfoI[];
    setState(data: WeatherInfoI): void;
    removeItemFromState(id: number): void;
}

export interface ServerI {
    getWeatherInfoByCords(lat: number, lon: number): Promise<WeatherInfoI>;
    getNewLocation(cityName: string): Promise<WeatherInfoI>;
}
