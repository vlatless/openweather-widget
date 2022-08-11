export interface WidgetState extends WeatherInfo {
    unit: Unit;
    error: string;
    locations: Array<string>;
}

export interface System {
    country: string;
    sunrise: number;
    sunset: number;
}

export interface RequestParams {
    city: string;
    lat?: number;
    lon?: number;
    unit: string;
}

export interface WeatherInfo {
    coord: Coord,
    weather: Weather;
    main: Main;
    name: String;
    wind: Wind;
    sys: System;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface Main {
    temp: number
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    gust: number;
    deg: number;
}

type Unit = 'metric' | 'imperial' | 'kelvin';