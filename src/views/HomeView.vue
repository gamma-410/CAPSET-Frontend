<template>
  <div class="home m-3">

    <div v-if="load" class="text-center mt-5 mb-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-for="post in posts" :key="post.id" class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <router-link :to="'/home/lives/' + post.id">
            <img
              class="image border"
              :src="'https://gravatar.com/avatar/' + post.email + '?s=500'"
              :alt="post.email"
            />
          </router-link>
        </div>

        <div class="col-md-8">
          <div class="card-body">
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
      load: true
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

.card {
  width: 100%;
}
.image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
</style>