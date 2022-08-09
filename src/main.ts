import App  from './App.vue';
import { createApp } from "vue";
import {store, key} from "./store";

const app = createApp(App);

(function initApp() {
    mountApp();
})();

function mountApp() {
    app.use(store, key).mount("#root")
    app.config.performance = true;
}