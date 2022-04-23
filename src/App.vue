<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link :to="{name:'popular'}">Popular</router-link> |
    <router-link :to="{name:'top-rated'}">Top Rated</router-link> |
    <router-link :to="{name:'upcoming'}">Upcoming</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
*{
  color:white;
}
#app {
  background-color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2f8c7c;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
