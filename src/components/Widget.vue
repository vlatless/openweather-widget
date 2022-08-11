<template>
    <div class="widget">
        <div :style="{height: '100%'}" v-if="store.state.error === ''">
            <div class="container head__container">
                <div class="text city-header"> 
                    {{store.state.name}}, {{store.state.sys.country}}
                    <img class="icon icon__default" src="../assets/svg/location.svg"/> 
                </div>
                <div class="container sun_container">
                    <img class="icon icon__sun" src="../assets/svg/sunrise.svg"/> 
                    <div class="text sunrise"> {{sunriseTime}}</div>
                    <img class="icon icon__sun" src="../assets/svg/sunset.svg"/> 
                    <div class="text sunset"> {{sunsetTime}}</div>
                </div>
                <span @click="toggleSettings">
                    <img v-if="isSettingOpen == false" class="icon gear__icon" src="../assets/svg/gear.svg"/>
                    <img v-else class="icon icon__default" src="../assets/svg/close.svg"/>
                </span>
            </div>
            <div v-if="isSettingOpen == false">
                <br/>
                <div class="container widget__container">
                    <img class="icon current_weather_icon" :src="config.iconsSrc + store.state.weather?.icon + '@2x.png'"/>
                    <div class="container current_temperature_container">
                        <div class="temperature current__temperature"> {{store.state.main.temp > 0 ? '+' : ''}}{{store.state.main.temp}} </div>
                        <div class="text temperature avg__temperature" id="min__temperature"> {{store.state.main.temp_min > 0 ? '+' : ''}} {{store.state.main.temp_min}} </div>
                        <div class="text temperature avg__temperature" id="max__temperature"> {{store.state.main.temp_max > 0 ? '+' : ''}} {{store.state.main.temp_max}} </div>
                    </div>

                    <div class="container current_weather_parameters">
                        <div class="text temperature parameter feels_like__parameter"><b>{{locale(messages.feelsLike)}}</b> {{store.state.main.feels_like > 0 ? '+' : ''}} {{store.state.main.feels_like}} </div>
                        <div class="text parameter wind__parameter">{{locale(messages.wind)}}: {{ store.state.wind.speed }} m/s</div>
                        <div class="text parameter pressure__parameter">{{locale(messages.pressure)}}: {{ store.state.main.pressure }}mmHg</div> 
                        <div class="text parameter description">{{store.state.weather.description}}</div>
                    </div>
                </div>
            </div>
            <Settings v-else/>
        </div>
        <Error v-else/>
    </div>
</template>

<script setup lang="ts">
import Settings from "../components/Settings.vue"
import Error from "../components/Error.vue"

import { useStore } from "../store";
import { ref, watch} from "vue";
import config from "../../app.config.json";
import { cookie } from "../operations/cookie";
import { useI18n } from "vue-i18n";
import { messages } from "../locales/messages";


const store = useStore();
const locale = useI18n().t;

const isSettingOpen = ref(false);
const sunsetTime = ref( new Date(store.state.sys.sunset * 1000).toLocaleTimeString().slice(0,-3));
const sunriseTime = ref(new Date(store.state.sys.sunrise * 1000).toLocaleTimeString().slice(0,-3));

function toggleSettings() {
    isSettingOpen.value = !isSettingOpen.value;
}
</script>
