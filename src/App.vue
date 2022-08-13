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
import { LocalTime, RequestParams, Units, WeatherInfo } from './store/types';
import { ACTIONS } from './store/actions';
import { watch } from 'vue';
import { cookie } from './operations/cookie';
import  config  from "./../app.config.json";
import { messages } from './locales/messages';
import { useI18n } from 'vue-i18n';

const store = useStore();
const locale = useI18n().locale;
const savedState = localStorage.getItem(config.stateCookieName);
onMounted(async () => {
     
    locale.value = store.state.lang;

    if (await isGeolocationPermitted() === false)
        store.dispatch(ACTIONS.setError, messages.unableFetchData); 

    if (savedState !== null)
        store.dispatch(ACTIONS.setWeatherInfo, JSON.parse(savedState!));
    else
        setInitialUserWeather();
 
});

watch(() => store.state, () => {
    setTimeout(() => {
        localStorage.setItem(config.stateCookieName, JSON.stringify(store.state));
    }, 1000);
}, { deep: true });

function setInitialUserWeather() {
    navigator.geolocation.getCurrentPosition(async position => {
        const weatherInfo = await (
            await api.fetchData({
                city: '',
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                unit: store.state.unit,
                lang: store.state.lang
            } as RequestParams)
        ).json() as WeatherInfo;

        store.dispatch(ACTIONS.setWeatherInfo, weatherInfo);
        store.dispatch(ACTIONS.setLocations, [weatherInfo.name]);
    }, () => {});
}

async function isGeolocationPermitted() {
    let isPremitted;
    const state = await (await navigator.permissions.query({ name: 'geolocation' })).state;

    if (state === "denied") isPremitted = false;
    else if (state === "granted") isPremitted = true;

    return isPremitted
}
</script>
