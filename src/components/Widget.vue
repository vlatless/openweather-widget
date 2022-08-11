<template>
    <div class="widget">
        <div v-if="store.state.error === ''">
            <div class="container head__container">
                <div class="text city-header"> 
                    {{store.state.name}}, {{store.state.sys.country}}
                    <img class="icon icon__default" src="../assets/svg/location.svg"/> 
                </div>
                <!-- <div class="contaner sun_container">
                    <div class="sunrise">  </div>
                    <div class="sunset"></div>
                </div> -->
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
                        <div class="text temperature parameter feels_like__parameter"><b>Feels like</b> {{store.state.main.feels_like > 0 ? '+' : ''}} {{store.state.main.feels_like}} </div>
                        <div class="text parameter wind__parameter">Wind: {{ store.state.wind.speed }} m/s</div>
                        <div class="text parameter pressure__parameter">Pressure: {{ store.state.main.pressure }}mmHg</div>
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

const store = useStore();

const isSettingOpen = ref(false);

function toggleSettings() {
    isSettingOpen.value = !isSettingOpen.value;
}
</script>
