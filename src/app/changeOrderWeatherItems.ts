import {WeatherInfoI} from "../types";

export function useChangeOrderWeatherItems() {

    function changeOrderWeatherItems(item: WeatherInfoI, currentItem: WeatherInfoI, state: WeatherInfoI[]) {
        return state.map(infoItem => {
            if (infoItem.id === item.id) {
                return {...infoItem, order: currentItem.order}
            }
            if (infoItem.id === currentItem.id) {
                return {...infoItem, order: item.order}
            }
            return infoItem;
        })
    }

    function sortItems(a: WeatherInfoI, b: WeatherInfoI) {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    }

    return { changeOrderWeatherItems, sortItems }
}
