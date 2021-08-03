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
};
</script>

<style lang="scss">
body {
  background-color: lightgrey;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #0c2444;
  a {
    font-weight: bold;
    color: white;
    text-decoration-line: none;

    &.router-link-exact-active {
      color: rgb(238, 150, 150);
    }
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
