import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/css/styles.css'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret)

/* add font awesome icon component */

createApp(App)
    .use(router)
    .component('fa', FontAwesomeIcon)
    .mount('#app')
