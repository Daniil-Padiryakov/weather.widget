import {WeatherInfoI} from "../domain/WeatherInfo";
import {WeatherStorageServiceI} from "../app/ports";

export class LocalStorageAdapter implements WeatherStorageServiceI {
    private _KEY_FOR_LC: string = 'Weather_Widget_State';

    constructor() {
        this.getStateFromLC();
    }

    private getStateFromLC(): WeatherInfoI[] {
        const dataFromLC = localStorage.getItem(this._KEY_FOR_LC);
        if (dataFromLC) {
            return JSON.parse(dataFromLC);
        }
        return [];
    }

    private setStateToLC(data: WeatherInfoI[]) {
        const dataToLC = JSON.stringify(data);
        localStorage.removeItem(this._KEY_FOR_LC);
        localStorage.setItem(this._KEY_FOR_LC, dataToLC);
    }

    public setState(data: WeatherInfoI[]) {
        this.setStateToLC([...data]);
    }

    public getState(): WeatherInfoI[] {
        return this.getStateFromLC();
    }

    public removeItemFromState(id: number) {
        const state = this.getStateFromLC();
        const newState = state.filter(item => item.id !== id)
        this.setStateToLC(newState);
    }
}
