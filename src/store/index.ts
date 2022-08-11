import { System, Weather, Wind } from './types.d';
import { actions } from "./actions";
import { mutations } from "./mutations";
import { InjectionKey } from "vue";

import { createStore, useStore as baseUseStore, Store } from "vuex";
import { Main, WidgetState } from "./types";
import  { cookie } from "../operations/cookie";
import config from "../../app.config.json";


const savedState = cookie.getCookie(config.stateCookieName);

const state: WidgetState = savedState !== undefined 
    ? JSON.parse(savedState) 
    : {
        coord: {
            lat: 0,
            lon: 0
        },
        weather: {} as Weather,
        wind: {} as Wind,
        error: '',
        main: { } as Main,
        unit: 'metric',
        name: '',
        sys: {} as System,
        locations: []
    };

// Для идентификации стора в функции useStore
export const key: InjectionKey<Store<WidgetState>> = Symbol();

export const store = createStore<WidgetState>({
	actions,
	mutations,
	state,
});

// Определение своей типизированной функции useStore, чтобы не импортировать в каждый компонент key стора.
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
export const useStore = () => {
	return baseUseStore(key);
};

