<template>
  <div class="container no-padding">
    <div v-if="load" class="text-center mt-5 mb-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="mt-5" style="text-align: center">
      <h5 v-if="none">現在開催中のライブがありません...</h5>
    </div>
    <div class="home m-3">
      <div v-for="post in posts" :key="post.id" class="flex-cont">
        <router-link :to="'/lives/' + post.id">
          <img
            class="live-icon"
            :src="'https://gravatar.com/avatar/' + post.email + '?s=500'"
            :alt="post.email"
          />
        </router-link>

        <div class="itemin">
          <h5 class="card-title mt-2">
            <b>{{ post.title }}</b>
          </h5>

          <p class="card-text">
            <small class="text-muted">{{ post.username }}</small
            ><br />
            <small class="text-muted">{{ post.postdate }}</small>
          </p>

          <form @submit.prevent="removeLive">
            <button
              v-if="post.username == userData.displayName"
              class="btn btn-dark"
              type="submit"
            >
              削除
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import axios from "axios";
import forge from "node-forge";

export default {
  data() {
    return {
      userData: "",
      posts: [],
      md5: "",
      load: true,
      none: false,
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
      }
    });
  },
  mounted() {
    axios
      .get("https://capset-backend-api.glitch.me/all")
      .then((response) => {
        this.posts = response.data;
        if (this.posts.length == 0) {
          this.none = true;
        }
        this.load = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    removeLive() {
      axios
        .post("https://capset-backend-api.glitch.me/delete/" + this.md5)
        .then((response) => {
          console.log(response.data);
          alert("ライブ配信を削除しました！");
          // リロード
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ライブ配信を削除できません...ログインしているアカウントが正しいか確認してください。"
          );
        });
    },
  },
};
</script>

<style>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.home::after {
  content: "";
  display: block;
  width: 650px;
}

.flex-cont {
  border-radius: 10px;
  box-shadow: 0px 1.5px 2px 1px #aaaaaa65;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 300px;
  background: #f8f8f8;
}
.live-icon {
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.itemin {
  margin: 10px;
}
</style>