import { Coord, Main, Weather, Wind } from './types.d';
import { MutationTree } from "vuex";
import { WidgetState } from "./types";
import { convertFromMBarToMmHg } from '../operations/pressureConverter';


export const mutations: MutationTree<WidgetState> = {
    coord(state, coord: Coord) {
        state.coord = coord;
    },
    weather(state, weather: Array<Weather>) {
        state.weather = weather[0];
    },
    main(state, main: Main) {
        state.main =  {
            temp:  Math.round(main.temp),
            feels_like: Math.round(main.feels_like),
            temp_min: Math.round(main.temp_min),
            temp_max: Math.round(main.temp_max),
            pressure: Math.round(convertFromMBarToMmHg(main.pressure)),
            humidity: Math.round(main.humidity)
        } as Main
    },
    name(state, name: string) {
        state.name = name;
    },
    wind(state, wind: Wind) {
        state.wind = wind;
    }
};