<template>
  <div class="register">
      <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png">
      <h1>Inscription</h1>
      <input type="text" v-model="username" placeholder="Saisir pseudo">
      <input type="text" v-model="email" placeholder="Saisir email">
      <input type="password" v-model="password" placeholder="Saisir mot de passe">
      <button @click="signUp">S'inscrire</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Register',
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async signUp() {
            let result = await axios.post('http://localhost:3000/api/users/signup', {
                username: this.username,
                email: this.email,
                password: this.password
            });
            console.warn(result);
            if(result.status==201) {
                alert('inscription réussie')
            }
        }
        
    }
}
</script>

<style lang="scss">
.register {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    img {
        width: 25%;
        height: 50%;
    }
    input, button {
        width: 10%;
        padding: 10px;
        border-radius: 10px;
    }
    button {
        padding: 10px;
        border-radius: 10px;
        background-color: blue;
        color: white;
        cursor: pointer;
        border: none;
    }
}
</style>