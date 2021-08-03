<template>
  <div v-if="userId">
    <div class="forum">
      <form>
        <div class="inputButtonForm">
          <input
            type="text"
            v-model="title"
            placeholder="Titre"
            class="titlePost"
          />
          <textarea
            placeholder="Contenu"
            id="content"
            v-model="content"
            rows="10"
            maxlength="200"
          ></textarea>

          <input type="file" id="picture" />
          <button @click.prevent="sendPost()">Publier</button>
        </div>
      </form>
      <div class="post" v-for="post in posts" :key="post.id">
        <div class="textPost">
          <h2 v-if="post.user">{{ post.user.username }}</h2>
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </div>
        <div class="imagePost"><img :src="post.imageUrl" alt="" /></div>
        <div class="buttonPost">
          <button
            v-if="isAdmin === 1 || post.user.username === username"
            @click.prevent="displayEditPost(post)"
          >
            Modifier
          </button>
          <button
            v-if="isAdmin === 1 || post.user.username === username"
            @click.prevent="deletePost(post)"
          >
            Supprimer
          </button>
        </div>
        <div class="modif" v-if="post.displayInput === true">
          <input type="text" v-model="title" placeholder="Titre" />
          <textarea
            placeholder="Contenu"
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
  </div>
  <div class="disconnect" v-else>
    <p>Veuillez vous identifier en cliquant sur le lien ci-dessous</p>
    <br />
    <router-link to="/account">Identifiez-vous</router-link>
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
      isAdmin: 0,
      username: "",
      userId: localStorage.getItem("token"),
    };
  },
  methods: {
    // METHODES POUR LES POSTS
    sendPost() {
      if (this.title !== "" || this.content !== "") {
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
            this.title = "";
            this.content = "";
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
      } else {
        alert("Veuillez renseigner le(s) champs manquants !");
      }
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
        });
    },
    displayEditPost(post) {
      post.displayInput = true;
    },
    noneEditPost(post) {
      post.displayInput = false;
      this.content = "";
      this.title = "";
    },
    updatePost(post) {
      if (this.title !== "" || this.content !== "") {
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
              response.data;
              window.location.reload();
            });
        }
      } else {
        alert("Veuillez renseigner le(s) champs manquants !");
      }
    },
    deletePost(post) {
      if (confirm("Voulez-vous poursuivre la suppression ?")) {
        axios
          .delete("http://localhost:3000/api/posts/" + post.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            response.data;
            window.location.reload();
          });
      }
    },
    getUserByToken() {
      axios
        .post(
          "http://localhost:3000/api/users/jwt",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.isAdmin = response.data.isAdmin;
          this.username = response.data.username;
        });
    },
  },
  mounted() {
    this.getAllPosts();
    this.getUserByToken();
  },
};
</script>

<style lang="scss" scoped>
.forum {
  padding-top: 30px;
  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    .inputButtonForm {
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 75%;
      margin: auto;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      .titlePost,
      #content {
        border: 1px solid;
        border-radius: 5px;
        padding: 10px;
        margin: 5px;
      }
      button {
        border-radius: 5px;
        font-size: 1.2em;
        margin: auto;
        padding: 5px;
        background: #0c2444;
        color: #fff;
        cursor: pointer;
        border: 1px solid #0c2444;
        width: 100%;
      }
    }
  }
  .post {
    width: 70%;
    margin: auto;
    margin-bottom: 20px;
    padding: 20px;
    border: 2px solid #ee9696;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 768px) {
      width: 100%;
      padding: 0;
    }
    .textPost {
      h2 {
        color: #d44c5c;
        font-weight: 500;
        font-family: Raleway, sans-serif;
      }
    }
    .buttonPost {
      display: flex;
      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
      button {
        border-radius: 5px;
        font-size: 1.2em;
        width: 150px;
        margin: 10px 5px;
        padding: 5px;
        background: #0c2444;
        color: #fff;
        cursor: pointer;
        border: 1px solid #0c2444;
        @media screen and (max-width: 768px) {
          font-size: 1em;
        }
      }
    }
    .imagePost {
      img {
        width: 50vw;
        object-fit: cover;
      }
    }
    .modif {
      display: flex;
      flex-direction: column;
      align-items: center;
      input,
      textarea,
      button {
        width: 90%;
        border-radius: 5px;
        padding: 10px;
        margin: 5px;
      }
      button {
        border-radius: 5px;
        font-size: 1.2em;
        width: 150px;
        margin: 10px 5px;
        padding: 5px;
        background: #0c2444;
        color: #fff;
        cursor: pointer;
        border: 1px solid #0c2444;
      }
    }
  }
}
.disconnect {
  margin-top: 150px;
  p {
    font-size: 1.3em;
    padding-bottom: 20px;
    color: black;
  }
  a {
    font-size: 1.3em;
    margin-top: 15px;
    text-decoration-line: none;
    color: #0c2444;
    font-weight: bold;
  }
}
</style>
