import App  from './App.vue';
 
import { createApp } from "vue";
import {store, key} from "./store";
import { createI18n, useI18n } from 'vue-i18n';

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
    app.use(i18n).use(store, key).mount("#root")
    app.config.performance = true;
}