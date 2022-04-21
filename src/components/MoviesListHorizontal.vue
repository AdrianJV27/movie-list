<template>
  <h1>{{title}}</h1>
  <Carousel :itemsToShow="3.95" :wrapAround="true">
    <Slide v-for="movie in movies" :key="movie.id">
      <div class="">
          <router-link :to="{name:'movie', params: { id: movie.id, movie }}"> 
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="" srcset="">
            <p>{{movie.title}}</p>
          </router-link>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { nextTick } from 'vue'
import getMoviesAPI from '@/helpers/getMovies';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';


export default {
  components:{
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    moviesType: {
      type: String,
    },
  },
  
  data(){
    return {
      movies: null,
      page: 1,

      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 5,
          snapAlign: 'start',
        },
      },
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
  img{
    width: 100%;
  }

  .carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
}

</style>