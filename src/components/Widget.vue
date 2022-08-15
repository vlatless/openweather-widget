<template>
    <div class="widget">
        <div :style="{height: '100%'}" v-if="store.state.error === ''">
            <div class="container head__container">
                <div class="text city-header"> 
                    {{store.state.name}}, {{store.state.sys.country}}
                    <Location class="icon icon__default"/>
                </div>
                <div class="container sun_container">
                    <Sunrise class="icon icon__sun"/>
                    <div class="text sunrise"> {{sunTime.sunrise}}</div>
                    <Sunset class="icon icon__sun"/>
                    <div class="text sunset"> {{sunTime.sunset}}</div>
                </div>
                <span @click="toggleSettings">
                    <Gear v-if="isSettingOpen == false" class="icon gear__icon"/>
                    <Close v-else class="icon icon__default"/>
                </span>
            </div>
            <div v-if="isSettingOpen == false">
                <br/>
                <div class="container widget__container">
                    <img class="icon current_weather_icon" :src="config.iconsSrc + store.state.weather[0]?.icon + '@2x.png'"/>
                    <div class="container current_temperature_container">
                        <div class="temperature current__temperature"> {{temperature.temp}} </div>
                        <div class="text temperature avg__temperature" id="min__temperature"> {{temperature.temp_min}} </div>
                        <div class="text temperature avg__temperature" id="max__temperature"> {{temperature.temp_max}} </div>
                    </div>

                    <div class="container current_weather_parameters">
                        <div class="text temperature parameter feels_like__parameter"><b>{{locale(messages.feelsLike)}}</b> {{temperature.feels_like}} </div>
                        <div class="text parameter wind__parameter">{{locale(messages.wind)}}: {{ store.state.wind.speed }} m/s</div>
                        <div class="text parameter pressure__parameter">{{locale(messages.pressure)}}: {{ pressure }} mmHg</div> 
                        <div class="text parameter description">{{store.state.weather[0]?.description}}</div>
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
import { onBeforeMount, onMounted, ref, watch} from "vue";
import config from "../../app.config.json";
import { cookie } from "../operations/cookie";
import { useI18n } from "vue-i18n";
import { messages } from "../locales/messages";
import { FormattedSunTime, FormattedTemperature } from "../store/types";

//svg
import Location from '../assets/svg/location.svg';
import Sunrise from '../assets/svg/sunrise.svg';
import Sunset from '../assets/svg/sunset.svg';
import Gear from '../assets/svg/gear.svg';
import Close from '../assets/svg/close.svg';

const store = useStore();
const locale = useI18n().t;

const isSettingOpen = ref(false);

const sunTime = ref({} as FormattedSunTime);
const temperature = ref({} as FormattedTemperature);
const pressure = ref(0);

watch(() => store.getters.sunTime, () => {
    sunTime.value.sunset =  store.getters.sunTime.sunset
    sunTime.value.sunrise = store.getters.sunTime.sunrise
});

watch(() => store.getters.temperature, () => {
    temperature.value.feels_like = store.getters.temperature.feels_like,
    temperature.value.temp = store.getters.temperature.temp,
    temperature.value.temp_max = store.getters.temperature.temp_max,
    temperature.value.temp_min = store.getters.temperature.temp_min
});

watch(() => store.getters.pressure, () => {
    pressure.value = store.getters.pressure.pressure;
});

function toggleSettings() {
    isSettingOpen.value = !isSettingOpen.value;
}
</script>
