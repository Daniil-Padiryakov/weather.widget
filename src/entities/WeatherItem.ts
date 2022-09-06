import {WeatherInfoI} from "../types";

export class WeatherItem implements WeatherInfoI {
    constructor(
    public city: string,
    public cloudsDesc: string,
    public country: string,
    public dewPoint: number,
    public humidity: number,
    public temp: number,
    public tempDesc: number,
    public test: number,
    public visibility: number,
    public windDesc: string,
    public windSpeed: number,
    ) {}
}
