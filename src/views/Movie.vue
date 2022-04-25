<template>
    <template v-if="movie">
        <div class="container shadow p-3 rounded" :style="cssVars">
            <div class="row">
                <div class="col-4">
                    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"  class="rounded img-fluid rounded-start" alt="...">
                </div>
                <div class="col-8 text-start">
                    <div class="row">
                        <h1>{{movie.title}}</h1>
                    </div>
                    <div class="row">
                        <h2>From: {{movie.release_date}}</h2>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <div class="progress-bar-custom progress">
                                <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" :style="`width: ${valorationPercentage}`" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                <span class="percentage text-end">{{valorationPercentage}}</span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="col-4 small-text"><h6>{{movie.vote_count}} Votes</h6></div>
                        </div>
                        <div class="col-4">
                            <FavoritesButton :movie="movie"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-">
                            <p>{{movie.overview}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <h1>Loading...</h1>
        <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </template>

</template>

<script>
import getMovieAPI from '@/helpers/getMovie';
import FavoritesButton from '@/components/FavoritesButton';
export default {
    props:{
        id:{
            type: Number
        },
        movieType:{
            type: String
        }
    },
    data(){
        return{
            movie: null,
        }
    },
    components:{
        FavoritesButton,
    },
    methods:{
        async getMovie(){
            console.log("Llamada a la API");
            try {
                this.movie = await getMovieAPI(this.id)
            } catch (error) {
                console.log(error);
                this.$router.push({name: 'home'})
            }
        },
        saveMovieIfExist(){
            const movieList = JSON.parse(localStorage.getItem(this.movieType));
            if(movieList){
                const movie = movieList.find( mov => mov.id == this.id);
                if(movie){
                    this.movie = movie
                    return
                }
            }
            this.getMovie()
        }
    },
    computed:{
        valorationPercentage(){
            return `${Number(this.movie.vote_average) * 10}%`
        },
        cssVars() {
            return {
                '--bg-image': `url(https://image.tmdb.org/t/p/w500${this.movie.poster_path})`,
                '--bg-image-position': `cover`,
            }
        }

    },
    created(){
        //Opcion 1
        // antes lo que hacia era guardar la pelicula y retornar true si lo habia guardado 
        // y false si no la encontraba
        // entonces luego aqui hacia esto:
        // if (this.saveMovieIfExist()) {
        //                 this.getMovie()
        // }
        this.saveMovieIfExist()
            
        //Opcion 2
        // const movieList = JSON.parse(localStorage.getItem(this.movieType));
        // if(movieList){
        //     const movie = movieList.find( mov => mov.id = this.id);
        //     if(movie){
        //         this.movie = movie
        //     }else{
        //         this.getMovie()
        //     }
        // }else{
        //     this.getMovie()
        // }

    },
}
</script>

<style scoped>
.progress-bar-custom{
    position: relative;
}
.percentage{
    color:black;
    font-weight: bold;
    position: absolute;
    right: 0;
}
.container{
    background-color: #18222c;
    /* background-image: var(--bg-image); */
    /* background-position: var(--bg-image-position); */

}
</style>