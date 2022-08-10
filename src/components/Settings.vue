<template>
    <div class="settings">
        <div class="container settings__container">
            <div class="container input__group">
                <input class="input search__input" placeholder="Search new location" v-model="searchableString">
                <button class="button search__button">
                    <img class="icon icon__default" src="../assets/svg/search.svg"/>
                </button>
            </div>
            <div class="container locations__container">
                <VueDraggableNext v-model="locations">
                    <div v-for="(location, index) in locations" :key="index" class="text location">
                        <img class="icon icon__default" src="../assets/svg/hamburger.svg"/>
                        {{location}}
                        <img class="icon icon__default" src="../assets/svg/delete.svg"/>
                    </div>
                </VueDraggableNext>
            </div>
        </div>
        <div v-if="isLocationFound && searchableString !== ''" class="text searchable__string">{{searchableString}}
        <button class="button">
            <img class="icon icon__default" src="../assets/svg/plus.svg"/>
        </button>
        </div>
        <div v-if="isLocationFound === false && searchableString === ''" class="container not_found_container">
            <div class="text not_found_text"> {{searchableString}} Not Found</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from '../operations/api';
import { RequestParams } from '../store/types';
import { ref, watch } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

const locations = ref<Array<string>>([]);
const searchableString = ref('');
const isLocationFound = ref(true);

watch(() => searchableString.value, async () => {
    const resp = await api.fetchData({ city: searchableString.value } as RequestParams);
    
    if (!resp.ok || searchableString.value === '')
        isLocationFound.value = false;
    else if (resp.ok || searchableString.value !== '')
        isLocationFound.value = true;
});

</script>
