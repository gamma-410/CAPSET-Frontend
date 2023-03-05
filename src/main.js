import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

// import bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import firebase
import firebase from 'firebase/app';
import 'firebase/auth';

// setting firebase
const firebaseConfig = {
    apiKey: "AIzaSyDOuR-UjyKwg6Pqhl0rK9iKTRWmyEPbokw",
    authDomain: "capset.firebaseapp.com",
    projectId: "capset",
    storageBucket: "capset.appspot.com",
    messagingSenderId: "505610084316",
    appId: "1:505610084316:web:ecdd2b107f14a3d7a3b919"
};
firebase.initializeApp(firebaseConfig);


createApp(App).use(router).mount('#app')
