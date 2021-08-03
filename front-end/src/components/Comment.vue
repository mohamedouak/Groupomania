<template>
  <div class="comment">
    <h1>Commentaires</h1>
    <div class="commentList" v-for="comment in comments" :key="comment.id">
      <h2>{{ comment.user.username }}</h2>
      <p>{{ comment.content }}</p>
      <button
        v-if="isAdmin === 1 || comment.user.username === username"
        @click.prevent="deleteComment(comment.id)"
      >
        supprimer
      </button>
    </div>
    <div class="buttonComment">
      <button @click.prevent="displayEditComment()">
        Laisser un commentaire
      </button>
      <textarea
        v-if="displayInput === true"
        placeholder="Commentaire"
        id="textComment"
        v-model="content"
        rows="10"
        maxlength="70"
      ></textarea>
      <div v-if="displayInput === true" class="edditButton">
        <button @click.prevent="displayEditComment()">Annuler</button>
        <button @click="sendComment()">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Comment",
  props: {
    postId: Number,
  },
  data() {
    return {
      comments: "",
      content: null,
      displayInput: false,
      isAdmin: 0,
      username: "",
    };
  },
  methods: {
    sendComment() {
      axios
        .post(
          "http://localhost:3000/api/comments",
          { content: this.content, postId: this.postId },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          response.data;
        });
      window.location.reload();
    },
    getAllComments() {
      axios
        .get("http://localhost:3000/api/comments/" + this.postId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.comments = response.data;
        });
    },
    displayEditComment() {
      this.displayInput = !this.displayInput;
      this.content = "";
    },
    deleteComment(comment) {
      if (confirm("Voulez-vous poursuivre la suppression ?")) {
        axios
          .delete("http://localhost:3000/api/comments/" + comment, {
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
    this.getAllComments();
    this.getUserByToken();
  },
};
</script>

<style lang="scss">
.comment {
  padding: 20px;
  display: flex;
  flex-direction: column;
  h1 {
    color: black;
    font-family: Georgia, "Times New Roman", Times, serif;
    @media screen and (max-width: 768px) {
      font-size: 1.6em;
    }
  }
  .commentList {
    h2 {
      color: #d44c5c;
      font-weight: 400;
    }
    button {
      border-radius: 5px;
      font-size: 1em;
      width: 130px;
      margin: 10px 5px;
      padding: 5px;
      background: #0c2444;
      color: #fff;
      cursor: pointer;
      border: 1px solid #0c2444;
    }
  }
  .buttonComment {
    button {
      border-radius: 5px;
      font-size: 1em;
      width: 180px;
      margin: 10px 5px;
      padding: 10px;
      background: #0c2444;
      color: #fff;
      cursor: pointer;
      border: 1px solid #0c2444;
    }
    .edditButton {
      display: flex;
      justify-content: space-around;
      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
    }
    #textComment {
      width: 90%;
      border-radius: 5px;
      padding: 10px;
      margin: 5px;
    }
  }
}
</style>
