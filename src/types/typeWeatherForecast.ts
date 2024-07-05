
export interface TypeForecast {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface List {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: any;
    dt_txt: Date;
    rain?: any;
}

export interface Clouds {
    all: number;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}


export interface Weather {
    id: number;
    main: any;
    description: Description;
    icon: any;
}

export enum Description {
    BrokenClouds = "broken clouds",
    HeavyIntensityRain = "heavy intensity rain",
    LightRain = "light rain",
    ModerateRain = "moderate rain",
    OvercastClouds = "overcast clouds",
    ScatteredClouds = "scattered clouds",
}
export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

