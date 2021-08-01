<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/account">Mon compte</router-link> |
      <router-link to="/forum">Forum</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.signup, .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    img {
        width: 25%;
        height: 100px;
        object-fit: cover;
    }
    input, button {
      font-size: 1.2em;
        width: 300px;
        height: 40px;
        padding: 10px;
        display: block;
        border: 1px solid skyblue;
        margin: 10px 0;
    }
    button {
        padding: 10px;
        background: skyblue;
        color: #fff;
        cursor: pointer;
        border: 1px solid skyblue;
    }
    a {
        text-decoration-line: none;
        color: black;
        cursor: pointer;
    }
}
.connect {
  p {
    display: flex;
    justify-content: center;
    button {    
      padding: 10px;
      background: skyblue;
      color: #fff;
      cursor: pointer;
      border: 1px solid skyblue;
      margin: 20px 10px;
      cursor: pointer;
    }
  }  
}
</style>
