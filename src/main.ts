import App  from './App.vue';
import { createApp } from "vue";

const app = createApp(App);


(function initApp() {
    mountApp();
})();

function mountApp() {
    app.mount("#root")
    
    app.config.performance = true;
}