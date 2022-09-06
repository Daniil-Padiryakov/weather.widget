import {StorageI, WeatherInfoI} from "../types";

export class LocalStorageA implements StorageI {
    private _state: WeatherInfoI[] = [];
    private _KEY_FOR_LC: string = 'Weather_Widget_State';

    constructor() {
        this.getStateFromLC();
    }

    private getStateFromLC() {
        const dataFromLC = localStorage.getItem(this._KEY_FOR_LC);
        if (dataFromLC) {
            this._state = JSON.parse(dataFromLC);
        }
    }

    private setStateToLC() {
        const dataToLC = JSON.stringify(this._state);
        localStorage.setItem(this._KEY_FOR_LC, dataToLC);
    }

    public setState(data: WeatherInfoI[]) {
        this._state = [...this._state, ...data];
        this.setStateToLC();
    }

    public getState(): WeatherInfoI[] {
        return this._state;
    }
}
