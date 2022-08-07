<template>
    <div class="widget">
        <div class="header city-header"> </div>
        <div class="container widget__container">
            <div class="container current_temperature_container">
                <img class="icon current_weather_icon" src="#"/>
                <div class="temperature current__temperature"> +24 </div>
                <div class="temperature avg__temperature" id="min__temperature"> +28 </div>
                <div class="temperature avg-_temperature" id="max__temperature"> +15 </div>
            </div>
            <div class="container current_weather_parameters">
                <div class="parameter feels_like__parameter"> +20 </div>
                <div class="parameter wind__parameter"> 3 ms, W </div>
                <div class="parameter pressure__parameter"> 756mmHg</div>
            </div>
            <hr>
            <div class="container weather_atlarge_container">
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
