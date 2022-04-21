<template>
    {{id}}
        <h1>{{movie.title}}</h1>
    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="" srcset="">

</template>

<script>
import getMovieAPI from '@/helpers/getMovie';
export default {
    props:{
        id:{
            type: Number
        }
    },
    data(){
        return{
            movie: null
        }
    },
    methods:{
        async getMovie(){
            this.movie = await getMovieAPI(this.id)
        }
    },
    created(){
        this.getMovie()
    }
    

}
</script>

<style>

</style>