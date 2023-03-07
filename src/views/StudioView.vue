<template>
  <div class="user pt-2 m-3">
    <h3 class="mb-4" v-if="!loginData">まだログインしていません...</h3>
    <p class="mb-5" v-if="!loginData">
      サービスをお使いになる前にログインが必要です
    </p>
    <router-link to="/home/user">
      <button v-if="!loginData" class="btn btn-dark">ユーザーページへ</button>
    </router-link>

    <div class="pt-5" v-if="loginData">
      <h3 class="mb-5">Creator Studio</h3>
      <h5 class="mb-4"><b>ライブ配信</b></h5>
      <p class="mb-4">サーバーURL<br />rtmp://live.gamma410.win/live</p>
      <p class="mb-5">ストリーミングキー<br />{{ md5 }}</p>
      <br>
      <h5 class="mb-4"><b>アイコンの変更</b></h5>
      <p class="mb-4">
        <a
          href="https://gravatar.com/"
          target="_blank"
          rel="noopener noreferrer"
          >Gravatarでアイコンを変更する</a
        >
      </p>
      <p class="mb-4">あなたのメールアドレス<br />{{ userData.email }}</p>
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