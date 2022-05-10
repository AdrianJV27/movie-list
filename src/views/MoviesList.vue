<template>
  <div class="container">
        {{movieType}}        {{page}}

    <div v-if="movies.length" class="row row-cols-4">
        <div v-for="movie in movies" :key="movie.id" class="col  px-3  d-flex justify-content-center">
            <SingleMovie :movie="movie"/>
        </div>
    </div>
    <div v-else class="alert alert-success" role="alert">
        We have a problem with the movies. Please wait...
    </div>
</div>
</template>

<script>
import getMoviesAPI from '@/helpers/getMovies';
import SingleMovie from '@/components/SingleMovie';

export default {
    props:{
        movieType:{
            default: 'popular',
            required: true,
        }
    },
    data(){
        return {
            page: 1,
            movies: [],
            cooldown: 5000,
            lastScrollTime: 0,
        }
    },
    methods:{
        async getMovies(){
        const movies = await getMoviesAPI(this.movieType, this.page)
        this.movies.push(...movies);
        // console.log(this.movies);
        },
        async handleScroll(){
            if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 50 ){
                this.page++;

                // window.removeEventListener('scroll', this.handleScroll)
                await this.getMovies();
                // this.movies.push()
            }
        }
    },
    components:{
        SingleMovie
    },
    watch:{
        movieType(){
            //this.getMovies()
            this.page
            console.log("hola", this.page);
        },
        movies(){
            window.addEventListener('scroll', this.handleScroll)
        }
    },
    created(){
        this.getMovies()
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll)
    },
    unmounted(){
        window.removeEventListener('scroll', this.handleScroll)
        console.log('unmounted');
    },
    beforeUnmount(){
        console.log('beforeUnmount');
    }
}
</script>

<style>

</style>