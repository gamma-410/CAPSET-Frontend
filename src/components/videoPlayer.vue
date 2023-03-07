<template>
  <div>
    <audio ref="videoPlayer" class="video-js"></audio>
    <div v-if="showErrorMessage" class="error-message">準備中...</div>
  </div>
</template>

<script>
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
      showErrorMessage: false,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
    this.player.on("error", () => {
      this.showErrorMessage = true;
      this.$refs.audioPlayer.style.display = "none";
    });
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style>
.video-js {
  width: 100%;
  height: auto;
  display: block;
  margin: auto;
  background: #3e3e3e;
  aspect-ratio: 16 / 9;
}

.error-message {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000e0;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.vjs-error-display {
  display: none !important;
}
</style>