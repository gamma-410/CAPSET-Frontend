<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container align">
        <router-link to="/home">
          <span class="navbar-brand mb-0">
            <img src="../public/logo.svg" width="150" />
          </span>
        </router-link>
        <span class="mb-0 small">
          <div>
            <router-link v-if="loginData" to="/home/create">
              <button class="btn btn-outline-dark">
                <i class="bi bi-plus-circle"></i>
              </button>
            </router-link>
            &nbsp;
            <router-link to="/home/user">
              <button class="btn btn-outline-dark">
                <i class="bi bi-person-circle"></i>
              </button>
            </router-link>
          </div>
        </span>
      </div>
    </nav>

    <div class="container no-padding">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      loginData: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginData = true;
      } else {
        this.loginData = false;
      }
    });
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.align {
  align-items: center;
}
* :hover {
  text-decoration: none;
  border: none;
  box-shadow: none;
}
.no-padding {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
</style>
