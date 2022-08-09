<template>
    <Widget/>
</template>

<script setup lang="ts">
import './assets/_index.scss';

import Widget from "./components/Widget.vue";
import Settings from "./components/Settings.vue"

import { onBeforeMount, onMounted } from '@vue/runtime-core';
import { useStore } from './store';
import { api } from './operations/api';
import { RequestParams, WeatherInfo } from './store/types';
import { ACTIONS } from './store/actions';


const store = useStore();

onBeforeMount(() => {
    setInitialUserWeather();
});

function setInitialUserWeather() {
    navigator.geolocation.getCurrentPosition(async position => {
        const weatherInfo = await (
            await api.fetchData({
                city: '',
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                unit: store.state.unit
            } as RequestParams)
        ).json() as WeatherInfo;

        store.dispatch(ACTIONS.setInitialCoord, weatherInfo.coord);
        store.dispatch(ACTIONS.setWeather, weatherInfo.weather);
        store.dispatch(ACTIONS.setMain, weatherInfo.main);
        store.dispatch(ACTIONS.setName, weatherInfo.name);
        store.dispatch(ACTIONS.setWind, weatherInfo.wind);
    }, () => {});
}
</script>
