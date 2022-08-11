<template>
    <div class="settings">
        <div class="container settings__container">
            <div class="container input__group">
                <input class="input search__input" placeholder="Search new location" v-model="searchableString">
                <button class="button search__button">
                    <img class="icon icon__default" src="../assets/svg/search.svg"/>
                </button>
            </div>
            <div class="container locations__container"  v-if="searchableString === ''">
                <VueDraggableNext v-model="locations">
                    <div v-for="(location, index) in locations" @mouseover="displayCheckbox(index)" @mouseleave="displayCheckbox(NaN)" :key="index" class="text location">
                        <img class="icon icon__default" src="../assets/svg/hamburger.svg"/>
                        {{location}}
                        <img v-if="displayedCheckBoxIndex === index" @click="selectNewLocation(location)" class="icon icon__default" src="../assets/svg/check.svg"/>
                        <img class="icon icon__default" @click="removeLocation(index)" src="../assets/svg/delete.svg"/>
                    </div>
                </VueDraggableNext>
            </div>
            <div class="container search_result_container" v-if="searchableString !== ''">
                <div v-if="isLocationFound && searchableString !== ''" class="text searchable__string">{{searchableString}}
                    <img class="icon icon__default" @click="setLocations" src="../assets/svg/plus.svg"/>
                </div>
                <div v-if="isLocationFound === false && searchableString !== ''" class="container not_found_container">
                    <div class="text not_found_text"> {{searchableString}} Not Found</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from '../operations/api';
import { RequestParams } from '../store/types';
import { ref, watch } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { useStore } from '../store';
import { ACTIONS } from '../store/actions';

const store = useStore();

const locations = ref<Array<string>>(store.state.locations.slice());
const searchableString = ref('');
const isLocationFound = ref(true);
const displayedCheckBoxIndex = ref();

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
    const weatherInfo = await (await api.fetchData({ city:location, unit: store.state.unit } as RequestParams)).json();
    store.dispatch(ACTIONS.setWeatherInfo, weatherInfo);
}

</script>
