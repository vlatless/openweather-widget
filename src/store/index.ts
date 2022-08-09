import { actions } from "./actions";
import { mutations } from "./mutations";
import { InjectionKey } from "vue";

import { createStore, useStore as baseUseStore, Store } from "vuex";
import { Main, WidgetState } from "./types";

const state: WidgetState = {
    coord: {
        lat: 0,
        lon: 0
    },
    weather: [],
    main: { } as Main,
    unit: 'metric',
    name: ''
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

