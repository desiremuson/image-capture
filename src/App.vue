<template>
  <v-app>
    <v-app-bar app color="#4B4A4A" dark>
      <div class="d-flex align-center">
        <h2>MMS</h2>
      </div>
      <v-spacer></v-spacer>

      <v-btn text v-show="!showCamera" @click="openCamera">
        open Camera
      </v-btn>
      <v-btn text @click="viewAllPicture" v-show="showCamera">
        All Images
      </v-btn>
    </v-app-bar>
    <v-row v-show="showCamera">
      <v-col cols="12" md="6">
        <Home @takepicture="this.takePicture" />
      </v-col>
      <v-col cols="12" md="6">
        <Galery />
      </v-col>
    </v-row>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Galery from "./views/Galery";
import firebase from "firebase";
export default {
  name: "App",

  components: {
    Home,
    Galery,
  },

  data() {
    return {
      showCamera: true,
    };
  },

  methods: {
    viewAllPicture() {
      this.showCamera = false;
      this.$router.push("/images");
    },
    openCamera() {
      this.showCamera = true;
      this.$router.push("/");
    },
    takePicture() {
      const picture = document.querySelector("canvas");
      const ctx = picture.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        document.querySelector("video"),
        0,
        0,
        picture.width,
        picture.height
      );
      this.convertImgToBlob(picture);
    },
    convertImgToBlob(img) {
      img.toBlob(function(blob) {
        var image = new Image();
        image.src = blob;
        let uploadTask = firebase
          .storage()
          .ref("images")
          .child("" + new Date())
          .put(blob);
        uploadTask.on(
          "state_changed",
          function(snapshots) {
            console.log(snapshots);
          },
          function(error) {
            console.log(error);
          },
          function(response) {
            console.log("success");
            console.log(response);
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              console.log(url);
            });
          }
        );
      });
    },
  },
};
</script>
<style scoped></style>
