<template>
    <div class="widget">
         <div class="container head__container">
                <div class="text city-header"> Saint Petersburg
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
                <img class="icon current_weather_icon" src="../assets/svg/sunny.svg"/>
                <div class="container current_temperature_container">
                    <div class="temperature current__temperature"> +24 </div>
                    <div class="text temperature avg__temperature" id="min__temperature"> +15 </div>
                    <div class="text temperature avg__temperature" id="max__temperature"> +28 </div>
                </div>

                <div class="container current_weather_parameters">
                    <div class="text temperature parameter feels_like__parameter"><b>Feels like</b> +20 </div>
                    <div class="text parameter wind__parameter">Wind: 3 ms, W </div>
                    <div class="text parameter pressure__parameter">Pressure: 756mmHg</div>
                </div>
            </div>
        </div>
        <Settings v-else/>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Settings from "../components/Settings.vue"

const isSettingOpen = ref(false);

function toggleSettings() {
    isSettingOpen.value = !isSettingOpen.value;
}
</script>
