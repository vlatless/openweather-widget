export interface WidgetState extends WeatherInfo {
    unit: Units;
    error: string;
    locations: Array<string>;
    lang: Langs;
}

export interface System {
    country: string;
    sunrise: number;
    sunset: number;
}

export interface FormattedSunTime {
    sunrise: string;
    sunset: string;
}

export interface RequestParams {
    city: string;
    lat?: number;
    lon?: number;
    unit: Units;
    lang: Langs
}

export interface WeatherInfo {
    coord: Coord,
    weather: Weather;
    main: Main;
    name: String;
    wind: Wind;
    sys: System;
    dt: number;
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
export interface FormattedTemperature {
    temp: string
    feels_like: string;
    temp_min: string;
    temp_max: string;
}

export interface LocalTime {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  seconds: number,
  milliSeconds: number,
  dateTime: string,
  date: string,
  time: string,
  timeZone: string,
  dayOfWeek: string,
}

export interface Wind {
    speed: number;
    gust: number;
    deg: number;
}

export enum Langs {
    en = 'en',
    ru = 'ru'
}

export enum Units {
    metric = 'metric',
    imperial = 'imperial',
    kelvin = 'kelvin',
}
