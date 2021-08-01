<template>
  <div class="forum">
    <h1>Bienvenue à toi sur le forum Groupomania</h1>
    <form>
      <input type="text" v-model="title" placeholder="Titre" />
      <textarea
        id="content"
        v-model="content"
        rows="10"
        maxlength="200"
      ></textarea>
      <div>
        <label>Sélectionnez votre image</label>
        <input type="file" id="picture" />
      </div>
      <div>
        <button @click.prevent="sendPost()">Publier</button>
      </div>
    </form>
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="textPost">
        <p v-if="post.user">{{ post.user.username }}</p>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </div>
      <div class="imagePost"><img :src="post.imageUrl" alt="" /></div>
      <div class="buttonPost">
        <button v-if="isAdmin === 1 || post.user.username === username" @click.prevent="displayEditPost(post)">Modifier</button>
        <button v-if="isAdmin === 1 || post.user.username === username" @click.prevent="deletePost(post)">Supprimer</button>
      </div>
      <div v-if="post.displayInput == true">
        <input type="text" v-model="title" placeholder="Titre" />
        <textarea
          id="text"
          v-model="content"
          rows="10"
          maxlength="200"
        ></textarea>
        <input type="file" id="pictureUpdate" />
        <button @click.prevent="updatePost(post), noneEditPost(post)">
          Envoyer
        </button>
        <button @click="noneEditPost(post)">Annuler</button>
      </div>
      <Comment :postId="post.id" />
    </div>
  </div>
</template>

<script>
import Comment from "../components/Comment.vue";
import axios from "axios";

export default {
  name: "Forum",
  components: {
    Comment,
  },
  data() {
    return {
      posts: "",
      title: "",
      content: "",
      imageUrl: "",
      postId: "",
      isAdmin: parseInt(localStorage.getItem("isAdmin")),
      username: localStorage.getItem("username")       
    };
  },
  methods: {
    // METHODES POUR LES POSTS
    sendPost() {
      let img = document.getElementById("picture").files[0];
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("imageUrl", img);
      axios
        .post("http://localhost:3000/api/posts", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          let idPost = response.data.id;
          axios
            .get(`http://localhost:3000/api/posts/${idPost}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((response) => {
              this.posts.splice(0, 0, response.data);
            });
        });
    },
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/posts/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.posts = response.data;
          this.posts.forEach(function(post) {
            post.displayInput = false;
          });
          console.log("mes posts : ", response.data);
        });
    },
    displayEditPost(post) {
      post.displayInput = true;
      console.log(post);
    },
    noneEditPost(post) {
      post.displayInput = false;
    },
    updatePost(post) {
      console.log(post.id);
      let img = document.getElementById("pictureUpdate").files[0];
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("imageUrl", img);
      if (confirm("Voulez-vous poursuivre la modification ?")) {
        axios
          .put("http://localhost:3000/api/posts/" + post.id, formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log(response);

            window.location.reload();
          });
      }
    },
    deletePost(post) {
      console.log(post.id);
      if (confirm("Voulez-vous poursuivre la suppression ?")) {
        axios
          .delete("http://localhost:3000/api/posts/" + post.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log(response);

            window.location.reload();
          });
      }
    },
  },
  mounted() {
    this.getAllPosts();
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}
.post {
  width: 70%;
  margin: auto;
  background-color: darkgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 25vw;
  }
}
</style>
