<template>
  <div class="live">
    <VideoPlayer
      v-if="videoOptions.sources[0].src !== ''"
      :options="videoOptions"
    />
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
</template>

<script>
import axios from "axios";
import VideoPlayer from "@/components/videoPlayer.vue";
import "video.js/dist/video-js.css";
import "videojs-contrib-hls";

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
    };
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
      })
      .catch((err) => {
        this.posts = err;
      });
  },
};
</script>

<style>
.video-js {
  background: #183952;
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
</style>