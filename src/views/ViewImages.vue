<template>
  <div class="main">
    <v-col cols="12" md="12">
      <div class="container"></div>
    </v-col>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "viewImages",

  components: {},

  data() {
    return {};
  },

  created() {
    // Since the images are in a folder,
    // we'll create a Reference to that folder:
    var storageRef = firebase.storage().ref("images");

    // Get the references of these images
    storageRef
      .listAll()
      .then(function(result) {
        console.log(result);
        result.items.forEach(function(imageRef) {
          // And finally display them
          displayImage(imageRef);
        });
      })
      .catch(function(error) {
        // Handle any errors
        console.log(error);
      });

    function displayImage(imageRef) {
      imageRef
        .getDownloadURL()
        .then(function(url) {
          // TODO: Display the image on the UI
          console.log(url);
          const image = document.createElement("img");
          image.src = url;
          image.style.margin = " 5px 10px";
          document.querySelector(".container").appendChild(image);
        })
        .catch(function(error) {
          // Handle any errors
          console.log(error);
        });
    }
  },
};
</script>

<style>
.container{
	margin-top: 50px;
}
</style>
