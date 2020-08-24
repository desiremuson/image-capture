<template>
  <div class="home">
    <video autoplay class="camera-open"></video>
    <v-btn
      class=" btnTake"
      fab
      dark
      color="error"
      @click="$emit('takepicture')"
    >
      <v-icon dark>mdi-camera</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    initialize() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        let constraints = {
          video: {
            width: {
              min: 640,
              ideal: 1280,
              max: 1920,
            },
            height: {
              min: 360,
              ideal: 720,
              max: 1080,
            },
          },
        };
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          const videoPlayer = document.querySelector("video");
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      } else {
        alert("cannot get get Media Device");
      }
    },
    takePicture() {},
  },
  beforeMount() {
    this.initialize();
  },
};
</script>
<style scoped>
.btnTake,
.camera-open {
  display: block;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 10px;
}
.camera-open {
  margin-top: 60px;
  background-color: #17171717;
  box-shadow: 6px 6px 12px 0px rgba(0, 0, 0, 0.35);
}
</style>
