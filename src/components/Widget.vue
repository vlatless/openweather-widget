<template>
    <div class="widget">
        <div class="container head__container">
            <div class="text city-header"> Saint Petersburg
                <img class="icon icon__default" src="../assets/svg/location.svg"/> 
            </div>
            <img class="icon icon__default" src="../assets/svg/gear.svg"/>
        </div>
        <br/>
        <div class="container widget__container">
            <img class="icon current_weather_icon" src="../assets/svg/sunny.svg"/>
            <div class="container current_temperature_container">
                <div class="temperature current__temperature"> +24 </div>
                <div class="text temperature avg__temperature" id="min__temperature"> +15 </div>
                <div class="text temperature avg__temperature" id="max__temperature"> +28 </div>
            </div>

            <div class="container current_weather_parameters">
                <div class="text parameter feels_like__parameter"><b>Feels like</b> +20 </div>
                <div class="text parameter wind__parameter">Wind: 3 ms, W </div>
                <div class="text parameter pressure__parameter">Pressure: 756mmHg</div>
            </div>
            <hr>
            <div class="container weather_atlarge_container">
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
