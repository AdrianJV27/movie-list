<template>
  <h1>{{title}}</h1>
    <div>
      <button @click="beforePage()"> Anterior </button>
      <button @click="afterPage()"> Siguiente </button>
    </div>


<div class="glider-contain">
  <div :class="`glider-${ moviesType }`">
        <div v-for="movie in movies" :key="movie.id" class="card">
          <router-link :to="{name:'movie', params: { id: movie.id, movie }}"> 
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="" srcset="">
            <p>{{movie.title}}</p>
          </router-link>
        </div>
  </div>

  <button aria-label="Previous" :class="`glider-prev glider-prev-${moviesType}`">«</button>
  <button aria-label="Next" :class="`glider-next glider-next-${moviesType}`">»</button>
  <div role="tablist" :class="`dots-${ moviesType }`"></div>
</div>
</template>

<script>
import { nextTick } from 'vue'
import getMoviesAPI from '@/helpers/getMovies';
export default {
  props: {
    moviesType: {
      type: String,
    },
  },
  data(){
    return {
      movies: null,
      page: 1,
    }
  },
  methods: {
    async getMovies(){
      this.movies = await getMoviesAPI(this.moviesType, this.page)
      // console.log(this.movies);
    },
    beforePage(){
      if (this.page == 1) { return }
      this.page--
    },
    afterPage(){
      if (this.page == 1000) { return }
      this.page++
    },
    async loadGlider(){
      //Como solucionar el problema de cuando tiro hacia atras no funciona el glider
    const movieType = this.moviesType;
    let element = (document.querySelector(`.glider-${this.moviesType}`));

    // window.addEventListener('load', () => {
      await nextTick()
      new Glider(element, {
        slidesToShow: 5,
        slidesToScroll: 5,
        draggable: true,
        dots: `.dots-${movieType}`,
        arrows: {
          prev: `.glider-prev-${movieType}`,
          next: `.glider-next-${movieType}`
        }
      });
    // });

    },
  },
  computed: {
    title(){
      return  this.moviesType == 'popular' ? 'Populares'
              :  this.moviesType == 'top_rated'? 'Mejor Valoradas'
              :  'Próximas'
    }
  },
  //Gracias al created no falla al espera a tener el valor de movie y asi no falla a la hora de renderizar //No me acuerdo muy bien
  created(){
    this.getMovies()
    // this.loadGlider()
    // let element = (document.querySelector(`.glider-${this.moviesType}`));
    // console.log(element);
    // console.log("created");

  },
  mounted(){
    //Si pongo aqui lo del loadGlider no funciona, no se porque
    this.loadGlider()
  },

  watch: {
    page(){
      this.getMovies()
    }
  }
};
</script>

<style>
  .container{
    display: flex;
  }
  .card{
    width: 100px;
    padding: 5px;
  }
  .card img {
        width: 100%;
  }
  a{
    color: white;
    text-decoration: none;
  }
  a:hover{
    color:beige
  }
</style>