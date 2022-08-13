<template>
    <div class="error" v-if="store.state.error !== ''">
        <div class="container error__container">
            <img class="icon location_error_icon" src="../assets/svg/location-error.svg"/>
            <div class="text header"> {{t(messages.unableFetchData)}} </div>
            <button class="button refresh__button"> 
                <div class="text">{{t(messages.refresh)}}</div>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useStore } from "../store";
import { messages } from "../locales/messages";

const store = useStore();
const t = useI18n().t;
</script>
