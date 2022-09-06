export const stub = {
    base: "stations",
    clouds: {all: 100},
    cod: 200,
    coord: {lon: 37.6156, lat: 55.7522},
    dt: 1662491655,
    id: 524901,
    main: {
        feels_like: 278.93,
        grnd_level: 999,
        humidity: 56,
        pressure: 1017,
        sea_level: 1017,
        temp: 281.27,
        temp_max: 281.9,
        temp_min: 281.01,
    },
    name: "Москва",
    sys: {
        type: 2,
        id: 47754,
        country: 'RU',
        sunrise: 1662432218,
        sunset: 1662480767
    },
    timezone: 10800,
    visibility: 10000,
    weather: [
        {
            id: 804,
            main: 'Clouds',
            description: 'Broken clouds',
            icon: '04n'
        }
    ],
    wind: {
        speed: 3.83,
        deg: 307,
        gust: 7.19
    },
}

export const cityStub = {
    country: "RU",
    lat: 53.198627,
    local_names: {et: 'Samara', fi: 'Samara', hu: 'Szamara', da: 'Samara', ro: 'Samara'},
    lon: 50.113987,
    name: "Samara",
    state: "Samara Oblast",
}

export const stub1 = {
    base: "stations",
    clouds: {all: 30},
    cod: 200,
    coord: {lon: 50.114, lat: 53.1986},
    dt: 1662500926,
    id: 499099,
    main: {feels_like: 5.35,
        grnd_level: 1001,
        humidity: 80,
        pressure: 1010,
        sea_level: 1010,
        temp: 6.96,
        temp_max: 7.3,
        temp_min: 6.96},
    name: "Samara",
    sys: {type: 2, id: 49376, country: 'RU', sunrise: 1662515950, sunset: 1662563796},
    timezone: 14400,
    visibility: 10000,
    weather: [{id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n'}],
    wind: {speed: 2.34, deg: 279, gust: 4.69},
}

export type resss = typeof stub1;
