<template>
  <div class="container">
    <div v-if="validMovies" class="row row-cols-4">
        <div v-for="movie in movies" :key="movie.id" class="col  px-3  d-flex justify-content-center">
            <SingleMovie :movie="movie" @modifiedFavourite="reloadMovies()"/>
        </div>
    </div>
    <div v-else class="alert alert-success" role="alert">
        You don't have any favorite movies.
    </div>
</div>
</template>

<script>
import SingleMovie from '@/components/SingleMovie'

export default {
    data(){
        return {
            movies: null
        }
    },
    components:{
        SingleMovie
    },
    computed:{
        validMovies(){
            if (!this.movies) {return false}
            if (!(this.movies instanceof Array)) {return false}
            if (!(this.movies.length)) {return false}
            return this.movies;
        }
    },
    methods:{
        reloadMovies(){
            this.movies = JSON.parse(localStorage.getItem('Favourites'))
        }
    },
    created(){
        this.movies = JSON.parse(localStorage.getItem('Favourites'))
        console.log(this.movies);
    }
}
</script>

<style>
.col{
    padding: 15px 0 ;
}

</style>