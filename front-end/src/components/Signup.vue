<template>
  <div class="signup">
    <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png" />
    <h1>Inscription</h1>
    <input type="text" v-model="username" placeholder="Pseudo" />
    <input type="text" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Mot de passe" />
    <button @click="signUp">S'inscrire</button>
    <p>
      <router-link to="/login">Se connecter</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async signUp() {
      let result = await axios.post("http://localhost:3000/api/users/signup", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      console.log(result);
      if (result.status == 201) {
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style lang="scss">
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  img {
    width: 250px;
    height: 100px;
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
    display: block;
    margin: 10px 0;
    padding: 10px;
    background: #0c2444;
    color: white;
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
