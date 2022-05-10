<template>
  <template v-if="movies" >
    <div class="p-3">
      <h3 class="title-custom text-left ps3">{{title}}</h3>
      <Carousel :settings="settings" :breakpoints="breakpoints" :wrapAround="true">
      <!-- //Quiero hacer que en movil se vea solo las imagenes mas pequeñas -->
        <Slide v-for="movie in movies" :key="movie.id">
            <SingleMovie :movie="movie"/>
        </Slide>

        <template #addons >
          <Navigation />
        </template>
      </Carousel>
    </div>
  </template>

</template>

<script>
// TODO: añadir lazy import
import getMoviesAPI from '@/helpers/getMovies';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import FavoritesButton from '@/components/FavoritesButton';
import SingleMovie from './SingleMovie';

export default {
  components:{
    Carousel,
    Slide,
    Pagination,
    Navigation,
    FavoritesButton,
    SingleMovie
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
      width: window.innerWidth, 
      height: window.innerHeight,
      settings: {
        itemsToShow: 1,
        snapAlign: 'start',
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        0: {
          itemsToShow: 3.25,
          itemsToScroll: 3,
          snapAlign: 'start',
        },
        // 700px and up
        400: {
          itemsToShow: 4.25,
          snapAlign: 'start',
        },
        700: {
          itemsToShow: 5.25,
          snapAlign: 'start',
        },
        750: {
          itemsToShow: 5.25,
          snapAlign: 'start',
        },
        // 1024 and up
        1025: {
          itemsToShow: 3.25,
          itemsToScroll: 3,
          snapAlign: 'start',
        },
        1325: {
          itemsToShow: 4.25,
          itemsToScroll: 3,
          snapAlign: 'start',
        },
        1524: {
          itemsToShow: 5.25,
          itemsToScroll: 5,
          snapAlign: 'start',
        },
      },
    }
  },
  methods: {
    async getMovies(){
      const movies = await getMoviesAPI(this.moviesType, this.page)

      let moviesLocalStorage = localStorage.getItem('movies') && JSON.parse(localStorage.getItem('movies'))
      if (!moviesLocalStorage) {
          localStorage.setItem("movies", '[]')
          moviesLocalStorage = JSON.parse(localStorage.getItem('movies'))
      }
      moviesLocalStorage.push(...movies)
      localStorage.setItem('movies', JSON.stringify(moviesLocalStorage));

      this.movies = movies;
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
    imageUrl(poster_path){

      if (poster_path) {
        return `https://image.tmdb.org/t/p/w500${poster_path}`;
      }else{
        return '//via.placeholder.com/350x150'
      }
    },
    description(desc){
      return desc.slice(0, 150).trim() + (desc.length > 150? "..." : '' )
    },
    onResize(e) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
  },
  computed: {
    title(){
      return  this.moviesType == 'popular' ? 'Populares'
              :  this.moviesType == 'top_rated'? 'Mejor Valoradas'
              :  'Próximas'
    },

  },
    watch: {
    page(){
      this.getMovies()
    }
  },
  //Gracias al created no falla al espera a tener el valor de movie y asi no falla a la hora de renderizar //No me acuerdo muy bien
  created(){
    this.getMovies()
    window.addEventListener("resize", this.onResize);
    // this.loadGlider()
    // let element = (document.querySelector(`.glider-${this.moviesType}`));
    // console.log(element);
    // console.log("created");

  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.text-left{
  text-align: left;
}

.container{
  display: flex;
}
/* .card{
  width: 100px;
  height: 100%;
  padding: 5px;
  color: white;
  background-color: #18222c!important;
}
.card img {
      width: 100%;
}

img{
  width: 100%;
} */
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


.title-custom{
  padding-left: 1rem!important;

}
</style>