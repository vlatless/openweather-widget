<template>
    <div class="widget">
         <div class="container head__container">
                <div class="text city-header"> 
                    {{weather.name}}
                    <img class="icon icon__default" src="../assets/svg/location.svg"/> 
                </div>
                <span @click="toggleSettings">
                    <img v-if="isSettingOpen == false" class="icon gear__icon" src="../assets/svg/gear.svg"/>
                    <img v-else class="icon icon__default" src="../assets/svg/close.svg"/>
                </span>
            </div>
        <div v-if="isSettingOpen == false">
            <br/>
            <div class="container widget__container">
                <img class="icon current_weather_icon" :src="config.iconsSrc + weather.weather[0]?.icon + '@2x.png'"/>
                <div class="container current_temperature_container">
                    <div class="temperature current__temperature"> {{weather.main.temp > 0 ? '+' : ''}}{{weather.main.temp}} </div>
                    <div class="text temperature avg__temperature" id="min__temperature"> {{weather.main.temp_min > 0 ? '+' : ''}} {{weather.main.temp_min}} </div>
                    <div class="text temperature avg__temperature" id="max__temperature"> {{weather.main.temp_max > 0 ? '+' : ''}} {{weather.main.temp_max}} </div>
                </div>

                <div class="container current_weather_parameters">
                    <div class="text temperature parameter feels_like__parameter"><b>Feels like</b> {{weather.main.feels_like > 0 ? '+' : ''}} {{weather.main.feels_like}} </div>
                    <div class="text parameter wind__parameter">Wind: {{ weather.wind.speed }} ms, W</div>
                    <div class="text parameter pressure__parameter">Pressure: {{ weather.main.pressure }}mmHg</div>
                </div>
            </div>
        </div>
        <Settings v-else/>
    </div>
</template>

<script setup lang="ts">
import Settings from "../components/Settings.vue"

import { useStore } from "../store";
import { ref, watch } from "vue";
import { Main, WeatherInfo } from "@/store/types";
import { convertFromMBarToMmHg } from "../operations/pressureConverter";
import config from "../../app.config.json";

const store = useStore();

const isSettingOpen = ref(false);

const weather = ref({ } as WeatherInfo);

watch(() => store.state.coord, () => {
    weather.value = {
        weather: store.state.weather,
        main: {
            temp:  Math.round(store.state.main.temp),
            feels_like: Math.round(store.state.main.feels_like),
            temp_min: Math.round(store.state.main.temp_min),
            temp_max: Math.round(store.state.main.temp_max),
            pressure: Math.round(convertFromMBarToMmHg(store.state.main.pressure)),
            humidity: Math.round(store.state.main.humidity)
        } as Main,
        name: store.state.name,
       wind: store.state.wind
    } as WeatherInfo
});

function toggleSettings() {
    isSettingOpen.value = !isSettingOpen.value;
}
</script>
