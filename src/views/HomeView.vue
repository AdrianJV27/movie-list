<template>
  <div class="home">
    <!-- <Banner/> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <MoviesListHorizontal moviesType="popular"/>
    <MoviesListHorizontal moviesType="top_rated"/>
    <MoviesListHorizontal moviesType="upcoming"/>
    <!-- <MoviesListHorizontalVue/> -->
    <!-- <MoviesListHorizontalVue/> -->
      <!-- Populars -->
      <!-- TopRated -->
      <!-- UpComing -->
    </div>
</template>

<script>
import MoviesListHorizontal from '@/components/MoviesListHorizontal.vue'
import Banner from '@/components/Banner.vue'

// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    Banner,
    MoviesListHorizontal
  }
}
</script>
