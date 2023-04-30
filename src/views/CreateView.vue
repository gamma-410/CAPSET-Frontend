<template>
  <div class="container no-padding">
    <div class="user pt-5 m-3">
      <h4 class="mb-5">新規ライブを作成</h4>
      <form @submit.prevent="createLive">
        <div class="mb-3">
          <label class="form-label">タイトル</label>
          <input
            v-model="title"
            class="form-control"
            placeholder="タイトルを入力"
          />
        </div>
        <div class="mb-5">
          <label class="form-label">概要</label>
          <textarea
            v-model="detail"
            class="form-control"
            rows="5"
            placeholder="概要を入力"
          ></textarea>
        </div>
        <button v-if="textLine" type="submit" class="btn btn-dark btn-block">
          これでライブを作成する！
        </button>
      </form>
    </div>
  </div>
</template>
  
<script>
import firebase from "firebase/app";
import axios from "axios";

export default {
  data() {
    return {
      textLine: false,
      username: "",
      email: "",
      title: "",
      detail: "",
    };
  },
  watch: {
    title(newVal) {
      if (newVal.length > 0) {
        this.textLine = true;
      } else {
        this.textLine = false;
      }
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.username = user.displayName;
      this.email = user.email;
    });
  },
  methods: {
    createLive() {
      axios
        .post(
          "https://capset-backend-api.glitch.me/post" +
            "?username=" +
            this.username +
            "&email=" +
            this.email +
            "&title=" +
            this.title +
            "&detail=" +
            this.detail
        )
        .then((response) => {
          console.log(response.data);
          alert("ライブ配信を作成しました！");
          // リロード
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ライブ配信を作成できませんでした...\n既にライブ配信を作成している場合は削除してからもう一度お試しください。"
          );
        });
    },
  },
};
</script>