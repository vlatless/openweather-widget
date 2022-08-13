import App  from './App.vue';
 
import { createApp } from "vue";
import {store, key} from "./store";
import { createI18n, useI18n } from 'vue-i18n';
import vueCustomElement from 'vue-custom-element';

import 'document-register-element/build/document-register-element';

import en from './locales/en.json';
import ru from './locales/ru.json';

const i18n = createI18n({
    legacy: false,
    messages: {
        en,
        ru
    }
});
const app = createApp(App);
 
(function initApp() {
    mountApp();
})();

function mountApp() {
    app
    .use(vueCustomElement)
    .use(i18n)
    .use(store, key).mount("vue-widget")
}