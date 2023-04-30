<template>
  <div class="container no-padding">
    <div class="user text-center pt-5 m-3">
      <h3 class="mb-4" v-if="!loginData">Welcome !</h3>
      <p class="mb-5" v-if="!loginData">
        サービスをお使いになる前にログインが必要です
      </p>
      <button class="btn btn-dark" @click="loginWithGoogle()" v-if="!loginData">
        Google でログイン
      </button>

      <div class="text-center pt-5" v-if="loginData">
        <img
          :src="'https://gravatar.com/avatar/' + md5 + '?s=120'"
          class="rounded rounded-pill border mb-3"
        />
        <h4>{{ userData.displayName }}</h4>
        <p class="mb-5">{{ userData.email }}</p>
      </div>
      <router-link to="/studio">
        <button class="btn btn-dark mb-3" v-if="loginData">
          Creator Studio
        </button>
      </router-link>
      <br />
      <button class="btn btn-dark" @click="logout()" v-if="loginData">
        サインアウト
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import forge from "node-forge";

export default {
  data() {
    return {
      userData: "",
      loginData: false,
      md5: "",
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;

        // user.email を md5 に変換
        const md = forge.md.md5.create();
        md.update(user.email);
        this.md5 = md.digest().toHex();

        this.loginData = true;
      } else {
        this.loginData = false;
      }
    });
  },
  methods: {
    async loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    },
    async logout() {
      await firebase.auth().signOut();
    },
  },
};
</script>