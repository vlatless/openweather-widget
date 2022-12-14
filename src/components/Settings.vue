<template>
    <div class="settings">
        <div class="container settings__container">
            <div class="container input__group">
                <input class="input search__input" :placeholder="t(messages.searchNewLocation)" v-model="searchableString">
                <select class="select locale__select" v-model="selectedLang">
                    <option v-for="(lang, index) in Langs" :key="'lang' + index" :value="lang">{{lang}}</option>
                </select>
                <select class="select unit__select" v-model="selectedUnit">
                    <option v-for="(unit, index) in Units" :key="'unit' + index" :value="unit">{{formatter.formatUnit(unit)}}°</option>
                </select>
            </div>
            <div class="container locations__container"  v-if="searchableString === ''">
                <VueDraggableNext v-model="locations">
                    <div v-for="(location, index) in locations" @mouseover="displayCheckbox(index)" @mouseleave="displayCheckbox(NaN)" :key="index" class="text location">
                        <Hamburger class="icon hamburger__icon"/>
                        {{location}}
                        <span>
                            <Check v-if="displayedCheckBoxIndex === index" @click="selectNewLocation(location)" class="icon icon__default"/>
                        </span>
                        <Delete class="icon icon__default" @click="removeLocation(index)"/>
                    </div>
                </VueDraggableNext>
            </div>
            <div class="container search_result_container" v-if="searchableString !== ''">
                <div v-if="isLocationFound && searchableString !== ''" class="text searchable__string">{{searchableString}}
                    <Plus class="icon icon__default" @click="setLocations" />
                </div>
                <div v-if="isLocationFound === false && searchableString !== ''" class="container not_found_container">
                    <div class="text not_found_text"> {{searchableString}} {{t(messages.notFound)}} </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from '../operations/api';
import { RequestParams, Langs, Units } from '../store/types';
import { ref, watch } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { useStore } from '../store';
import { ACTIONS } from '../store/actions';
import { useI18n } from "vue-i18n";
import { messages } from "../locales/messages";
import { formatter } from "../operations/formatter";

//svg
import Hamburger from '../assets/svg/hamburger.svg';
import Check from '../assets/svg/check.svg';
import Delete from '../assets/svg/delete.svg';
import Plus from '../assets/svg/plus.svg';

const store = useStore();
const t = useI18n().t;
const locale = useI18n().locale;

const locations = ref<Array<string>>(store.state.locations.slice());
const searchableString = ref('');
const isLocationFound = ref(true);
const displayedCheckBoxIndex = ref();
const selectedLang = ref(store.state.lang);
const selectedUnit = ref(store.state.unit);

watch(() => searchableString.value, async () => {
    const resp = await api.fetchData({ city: searchableString.value } as RequestParams);
    
    if (!resp.ok || searchableString.value === '')
        isLocationFound.value = false;
    else if (resp.ok || searchableString.value !== '')
        isLocationFound.value = true;
});

watch(() => locations.value, () => {
    store.dispatch(ACTIONS.setLocations, locations.value);
}, { deep: true });

watch(() => [selectedLang.value, selectedUnit.value], () => {
    store.dispatch(ACTIONS.setLang, selectedLang.value);
    store.dispatch(ACTIONS.setUnit, selectedUnit.value);
    selectAndSetNewWeatherData({ 
            city: store.state.name, 
            unit: store.state.unit, 
            lang: store.state.lang
        } as RequestParams);

    locale.value = selectedLang.value;
});

function setLocations() {
    locations.value.push(searchableString.value);
    clearSearchableString();
}

function clearSearchableString() {
    searchableString.value = '';
}

function removeLocation(index: number) {
    locations.value = locations.value.filter((loc, i) => i !== index);
}

function displayCheckbox(index: number) {
    displayedCheckBoxIndex.value = index;
}

async function selectNewLocation(location: string) {
    await selectAndSetNewWeatherData({ city:location, unit: store.state.unit } as RequestParams);
}

async function selectAndSetNewWeatherData(params: RequestParams) {
    const weatherInfo = await (await api.fetchData(params)).json();
    store.dispatch(ACTIONS.setWeatherInfo, weatherInfo);
}

</script>
