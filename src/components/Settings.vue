<template>
    <div class="settings">
        <div class="container settings__container">
            <div class="container locations__container">
                <VueDraggableNext v-model="locations">
                    <div v-for="(location, index) in locations" :key="index" class="text location">
                        <img class="icon icon__default" src="../assets/svg/hamburger.svg"/>
                        {{location}}
                        <img class="icon icon__default" src="../assets/svg/delete.svg"/>
                    </div>
                </VueDraggableNext  >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
  import { VueDraggableNext } from 'vue-draggable-next';

const locations = ref(['Moscow', 'Saint-Petersburg', 'Ufa', 'Kazan','Moscow', 'Saint-Petersburg', 'Ufa', 'Kazan', 'Saint-Petersburg', 'Ufa', 'Kazan', 'Saint-Petersburg', 'Ufa', 'Kazan']);
</script>
