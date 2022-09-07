import {StorageI, WeatherInfoI} from "../types";

export class LocalStorageA implements StorageI {
    private _KEY_FOR_LC: string = 'Weather_Widget_State';

    constructor() {
        this.getStateFromLC();
    }

    private getStateFromLC() {
        const dataFromLC = localStorage.getItem(this._KEY_FOR_LC);
        if (dataFromLC) {
            return JSON.parse(dataFromLC);
        }
        return [];
    }

    private setStateToLC(data: any) {
        console.log(data)
        const dataToLC = JSON.stringify(data);
        localStorage.removeItem(this._KEY_FOR_LC);
        localStorage.setItem(this._KEY_FOR_LC, dataToLC);
    }

    public setState(data: WeatherInfoI) {
        this.setStateToLC([...this.getStateFromLC(), data]);
    }

    public getState(): WeatherInfoI[] {
        return this.getStateFromLC();
    }
}
