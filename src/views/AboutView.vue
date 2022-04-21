<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="test">TestAPI</button>
  </div>
</template>

<script>
import getMoviesAPI from '@/helpers/getMovies'
export default {
  methods: {
    test(){
      getMoviesAPI()
    },
  }
}
</script>

<style>

</style>