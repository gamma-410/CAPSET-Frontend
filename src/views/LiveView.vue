<template>
  <div class="container-fluid no-padding">
    <div class="live">
      <VideoPlayer
        v-if="videoOptions.sources[0].src !== ''"
        :options="videoOptions"
      />

      <nav>
        <div
          class="nav nav-tabs justify-content-center"
          id="nav-tab"
          role="tablist"
        >
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
          >
            <i class="bi bi-info-circle-fill"></i>
          </button>
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
          >
            <i class="bi bi-chat-dots-fill"></i>
          </button>
        </div>
      </nav>

      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-home"
          aria-labelledby="nav-home-tab"
        >
          <div class="m-2">
            <h4 class="mt-4">
              <b>{{ title }}</b>
            </h4>
            <hr />
            <p>
              <b>{{ username }}</b>
            </p>
            <hr />
            <p>作成日: {{ postdate }}</p>
            <p>{{ detail }}</p>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-profile"
          aria-labelledby="nav-profile-tab"
        >
          <div class="input-group mt-3 mb-3" v-if="usercheck">
            <input
              v-model="inputComment"
              class="form-control"
              placeholder="チャットで盛り上がろう！"
            />
            <button @click="addComment()" class="btn btn-outline-primary">
              <i class="bi bi-send-fill"></i>
            </button>
          </div>
          <p class="chat mt-3" v-else>
            <b>チャットに参加するにはログインが必要です...</b>
          </p>
          <div
            class="chat-box mt-2"
            v-for="(message, index) in reverseItems"
            :key="index"
          >
            <div>
              <p class="chat">{{ message.user }} : {{ message.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VideoPlayer from "@/components/videoPlayer.vue";
import "video.js/dist/video-js.css";
import "videojs-contrib-hls";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      posts: [],
      title: "",
      username: "",
      detail: "",
      postdate: "",
      email: "",
      streamingkey: "",
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: "",
            type: "application/x-mpegURL",
          },
        ],
      },
      usercheck: false,
      db: null,
      myUserName: "",
      inputComment: "",
      messages: [],
    };
  },
  computed: {
    reverseItems() {
      return this.messages.slice().reverse();
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.usercheck = true;
        this.myUserName = user.displayName;
      }
    });
    this.db = firebase.firestore();
  },
  mounted() {
    axios
      .get("https://capset-backend-api.glitch.me/all/" + this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.posts = res.data;
        this.title = this.posts[0].title;
        this.username = this.posts[0].username;
        this.detail = this.posts[0].detail;
        this.postdate = this.posts[0].postdate;
        this.email = this.posts[0].email;
        this.streamingkey = this.posts[0].streamingkey;
        this.videoOptions.sources[0].src =
          "https://live.gamma410.win/hls/" + this.streamingkey + ".m3u8";

        firebase
          .firestore()
          .collection(this.streamingkey)
          .orderBy("timestamp")
          .onSnapshot((querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
              messages.push(doc.data());
            });
            this.messages = messages;
          });
      })
      .catch((err) => {
        this.posts = err;
      });
  },
  methods: {
    addComment() {
      this.db.collection(this.streamingkey).add({
        content: this.inputComment,
        user: this.myUserName,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      });
      this.inputComment = "";
    },
  },
};
</script>

<style>
.video-js {
  background: linear-gradient(135deg, #21d4fd, #b721ff);
  background: -webkit-linear-gradient(-45deg, #21d4fd, #b721ff);
  background-image: repeating-linear-gradient(
    135deg,
    rgba(50, 101, 111, 1) 5%,
    rgba(0, 68, 91, 1) 15%
  );
  background-size: 150% 150%;
  animation-name: gradation;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
}
@keyframes gradation {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}
.video-js .vjs-menu-button-inline.vjs-slider-active,
.video-js .vjs-menu-button-inline:focus,
.video-js .vjs-menu-button-inline:hover,
.video-js.vjs-no-flex .vjs-menu-button-inline {
  width: 10em;
}

.video-js .vjs-controls-disabled .vjs-big-play-button {
  display: none !important;
}

.video-js .vjs-control {
  width: 3em;
}

.video-js .vjs-menu-button-inline:before {
  width: 1.5em;
}

.vjs-menu-button-inline .vjs-menu {
  left: 3em;
}

.vjs-paused.vjs-has-started.video-js .vjs-big-play-button,
.video-js.vjs-ended .vjs-big-play-button,
.video-js.vjs-paused .vjs-big-play-button {
  display: block;
}

.video-js .vjs-load-progress div,
.vjs-seeking .vjs-big-play-button,
.vjs-waiting .vjs-big-play-button {
  display: none !important;
}

.video-js .vjs-mouse-display:after,
.video-js .vjs-play-progress:after {
  padding: 0 0.4em 0.3em !important;
}

.video-js.vjs-ended .vjs-loading-spinner {
  display: none;
}

.video-js.vjs-ended .vjs-big-play-button {
  display: block !important;
}

video-js.vjs-ended .vjs-big-play-button,
.video-js.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started.video-js .vjs-big-play-button {
  display: block;
}

.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  margin-top: -1em;
}

.video-js .vjs-big-play-button {
  background-color: rgba(45, 158, 234, 0.8);
  font-size: 2.5em;
  border-radius: 50%;
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important;
}

.video-js:hover .vjs-big-play-button,
.video-js .vjs-big-play-button:focus,
.video-js .vjs-big-play-button:active {
  background-color: rgba(44, 151, 222, 0.9);
}

.video-js .vjs-loading-spinner {
  border-color: #2c97de;
}

.video-js .vjs-control-bar2 {
  background-color: transparent;
}

.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0) !important;
  color: #ffffff;
  font-size: 17px;
}

.video-js .vjs-play-progress,
.video-js .vjs-volume-level {
  background-color: #2c97de;
}

.video-js .vjs-big-play-button {
  height: 2em !important;
  width: 2em !important;
  line-height: 1.7em !important;
  margin-top: -1em !important;
  margin-left: -1em;
  border-width: 4px;
}

.video-js .vjs-icon-play:before,
.video-js .vjs-big-play-button:before {
  font-size: 40px;
}

.video-js .vjs-progress-holder {
  font-size: 1.7em;
  border-radius: 10px;
}

.video-js .vjs-progress-holder .vjs-play-progress,
.video-js .vjs-progress-holder .vjs-load-progress,
.video-js .vjs-progress-holder .vjs-load-progress div,
.video-js .vjs-slider,
.vjs-volume-level {
  border-radius: 10px;
}

.video-js .vjs-load-progress {
  background: rgba(255, 255, 255, 0.5);
}

.video-js,
.video-js video,
.vjs-poster,
.video-js .vjs-tech {
  border-radius: 0px;
}

.container-fluid {
  margin-right: auto;
  margin-left: auto;
  max-width: 800px;
}
.chat-box {
  width: 100%;
}
.chat {
  width: 100%;
  background: #fbfbfb;
  border: solid 1px #d6d6d6;
  border-radius: 10px;
  padding: 10px;
}
</style>