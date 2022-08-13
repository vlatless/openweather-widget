import { Coord, Main, Weather, Wind, System, Langs, Units, LocalTime } from './types.d';
import { MutationTree } from "vuex";
import { WidgetState } from "./types";
import { convertFromMBarToMmHg } from '../operations/pressureConverter';


export const mutations: MutationTree<WidgetState> = {
    coord(state, coord: Coord) {
        state.coord = coord;
    },
    weather(state, weather: Array<Weather>) {
        state.weather = weather;
    },
    main(state, main: Main) {
        state.main =  {
            temp: main.temp,
            feels_like: main.feels_like,
            temp_min: main.temp_min,
            temp_max: main.temp_max,
            pressure: main.pressure,
            humidity: main.humidity
        } as Main
    },
    sys(state, sys: System) {
        state.sys = sys;
    },
    name(state, name: string) {
        state.name = name;
    },
    wind(state, wind: Wind) {
        state.wind = wind;
    },
    locations(state, locations: Array<string>) {
        state.locations = [...locations];
    },
    error(state, error: string) {
        state.error = error;
    },
    lang(state, lang: Langs) {
        state.lang = lang;
    },
    unit(state, unit: Units) {
        state.unit = unit;
    },
    localTime(state, dt: number) {
        state.dt = dt;
    }
};