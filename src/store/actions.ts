import { Coord, Weather, Main, Wind } from './types.d';
import { store } from './index';
import { ActionTree } from "vuex";
import { WidgetState } from "./types";
import { api } from "../operations/api";
import config from "../../app.config.json";

export const ACTIONS = {
	setInitialCoord: `setInitialCoord`,
	setWeather: `setWeather`,
	setMain: `setMain`,
	setName: `setName`,
	setWind: `setWind`
}

export const actions: ActionTree<WidgetState, WidgetState> = {
	setInitialCoord({ commit }, data: Coord) {
		commit("coord", data);
	},
	setWeather({ commit }, data: Array<Weather>) {
		commit("weather", data);
	},
	setMain({ commit }, data: Main) {
		commit("main", data);
	},
	setName({ commit }, data: string) {
		commit('name', data);
	},
	setWind({ commit }, data: Wind) {
		commit('wind', data)
	}
};
