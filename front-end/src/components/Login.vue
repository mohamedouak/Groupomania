<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png" />
    <h1>Connexion</h1>
    <input type="text" v-model="username" placeholder="Pseudo" />
    <input type="password" v-model="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
    <p>
      <router-link to="/signup">S'inscrire</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (this.username !== null || this.password !== null) {
        axios
          .post("http://localhost:3000/api/users/login", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            if (res.status === 200) {
              this.$router.push({ name: "Account" });
            }
          })
          .catch((error) => console.error(error));
      } else {
        alert("oops !");
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  img {
    height: 80px;
    object-fit: cover;
  }
  h1 {
    color: #0c2444;
  }
  input {
    font-size: 1.2em;
    width: 300px;
    height: 40px;
    padding: 10px;
    display: block;
    margin: 10px 0;
    @media screen and (max-width: 768px) {
      font-size: 1em;
      width: 200px;
      height: 20px;
      padding: 10px;
    }
  }
  button {
    border-radius: 5px;
    font-size: 1.2em;
    width: 300px;
    height: 40px;
    padding: 10px;
    margin: 10px 0;
    background: #0c2444;
    color: #fff;
    cursor: pointer;
    border: 1px solid #0c2444;
    @media screen and (max-width: 768px) {
      font-size: 1em;
      width: 200px;
      padding: 10px;
    }
  }
  a {
    text-decoration-line: none;
    color: black;
    cursor: pointer;
  }
}
</style>
