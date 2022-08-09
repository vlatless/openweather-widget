import { Coord, Main, Weather, Wind } from './types.d';
import { MutationTree } from "vuex";
import { WidgetState } from "./types";

export const mutations: MutationTree<WidgetState> = {
    coord(state, coord: Coord) {
        state.coord = coord;
    },
    weather(state, weather: Array<Weather>) {
        state.weather = weather;
    },
    main(state, main: Main) {
        state.main = main;
    },
    name(state, name: string) {
        state.name = name;
    },
    wind(state, wind: Wind) {
        state.wind = wind;
    }
};