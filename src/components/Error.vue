<template>
    <div class="error" v-if="store.state.error !== ''">
        <div class="container error__container">
            <img class="icon location_error_icon" src="../assets/svg/location-error.svg"/>
            <div class="text header"> {{t(messages.unableFetchData)}} </div>
            <button class="button refresh__button" @click="refeshWidget()"> 
                <div class="text">{{t(messages.refresh)}}</div>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useStore } from "../store";
import { messages } from "../locales/messages";
import { api } from "../operations/api";
import { ACTIONS } from "../store/actions";
import { RequestParams, WeatherInfo } from "../store/types";

const store = useStore();
const t = useI18n().t;

async function refeshWidget() {
   if (await api.isGeolocationPermitted()) {
        store.dispatch(ACTIONS.setError, "");
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
        }, () => {});
    }

}

</script>
