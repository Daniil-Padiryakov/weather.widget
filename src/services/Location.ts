import {LocationI} from "../types";

export class GeoLocation implements LocationI{
    public getCurrentLocation() {
        const getCurrentLocationPromise = (): Promise<{ latitude: number, longitude: number }> => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    position => resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }),
                    error => reject(error),
                    {maximumAge: 0}
                )
            })
        }
        return getCurrentLocationPromise();
    }
}
