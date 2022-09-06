import {WeatherInfoI, WeatherSettingsI} from "../types";

export class Settings implements WeatherSettingsI {
    constructor(
        public weatherLocation: WeatherInfoI[],
    ) {}

    public addLocation(newWeatherLocation: WeatherInfoI) {
        this.weatherLocation = [...this.weatherLocation, newWeatherLocation];
    }

    public removeLocation(idLocation: number) {
        this.weatherLocation = this.weatherLocation
            .filter(item => item.id !== idLocation);
    }
}
