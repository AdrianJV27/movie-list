<template>
  <div>
    <nav>
      <router-link :to="{name:'home'}">Home</router-link> |
      <router-link :key="'popular'" :to="{name:'movie-list', params: { movieType:'popular' } }">Popular</router-link> |
      <router-link :key="'top_rated'" :to="{name:'movie-list', params: { movieType:'top_rated' } }">Top Rated</router-link> |
      <router-link :key="'upcoming'" :to="{name:'movie-list', params: { movieType:'upcoming' } }">Upcoming</router-link> |
      <router-link :to="{name:'favourites'}">Favourites</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <div class="p-2"></div>
    <router-view :key="$route.fullPath"/>
    <div class="p-5"></div>
    <Footer/>
  </div>

</template>
<script>
import Footer from '../src/components/Footer'
export default {
  components:{
    Footer
  }
}
</script>
<style>
*{
  color:white;
}
#app {
  /* background-color: #2c3e50; */
  background: rgb(28,70,113);
  background: linear-gradient(330deg, rgba(28,70,113,1) 0%, rgba(44,62,80,1) 100%);

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #28394a;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2f8c7c;
  text-decoration: none;

}

nav a:hover {
    color: #5a968c;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
