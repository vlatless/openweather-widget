import { Coord, Weather, Main, Wind, System, Langs, Units, LocalTime } from './types.d';
import { store } from './index';
import { ActionTree } from "vuex";
import { WidgetState } from "./types";
import { api } from "../operations/api";
import config from "../../app.config.json";

export const ACTIONS = {
	setWeatherInfo: `setWeatherInfo`,
	setInitialCoord: `setInitialCoord`,
	setWeather: `setWeather`,
	setMain: `setMain`,
	setName: `setName`,
	setWind: `setWind`,
	setLocations: `setLocations`,
	setSys: `setSys`,
	setError: `setError`,
	setLang: `setLang`,
	setUnit: `setUnit`,
	setLocalTime: `setLocalTime`
}

export const actions: ActionTree<WidgetState, WidgetState> = {
	setWeatherInfo({ commit }, data: WidgetState) {
		store.dispatch(ACTIONS.setInitialCoord, data.coord);
		store.dispatch(ACTIONS.setSys, data.sys);
        store.dispatch(ACTIONS.setWeather, data.weather);
        store.dispatch(ACTIONS.setMain, data.main);
        store.dispatch(ACTIONS.setName, data.name);
        store.dispatch(ACTIONS.setWind, data.wind);
		store.dispatch(ACTIONS.setLocalTime, data.dt);
	},
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
		commit('wind', data);
	},
	setSys({ commit }, data: System) {
		commit('sys', data)
	},
	setLocations({ commit }, data: Array<string>) {
		commit('locations', data);
	},
	setError({ commit }, data: string) {
		commit('error', data);
	},
	setLang({ commit }, data: Langs) {
		commit('lang', data);
	},
	setUnit({ commit }, data: Units) {
		commit('unit', data);
	},
	setLocalTime({ commit }, data: number) {
		commit('localTime', data);
	}
};
