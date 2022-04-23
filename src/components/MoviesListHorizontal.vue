<template>
  <template v-if="movies">

  <h1>{{title}}</h1>
  <Carousel :settings="settings" :breakpoints="breakpoints" :wrapAround="true">

    <Slide v-for="movie in movies" :key="movie.id">
      <!-- <div class="card" style="width: 18rem;">
        <img :src="imageUrl(movie.poster_path)" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{movie.title}}</h5>
          <p class="card-text">{{description(movie.overview)}}</p>
        </div>
        <router-link class="btn btn-success" :to="{name:'movie', params: { id: movie.id, movieType: moviesType }}"> 
          See more...
        </router-link>
      </div> -->
      a
    </Slide>

    <template #addons >
      <Navigation />
    </template>
  </Carousel>
  </template>

</template>

<script>
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
        0: {
          itemsToShow: 1,
          snapAlign: 'center',
        },
        // 700px and up
        600: {
          itemsToShow: 2,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 3,
          itemsToScroll: 3,
          snapAlign: 'center',
        },
        1524: {
          itemsToShow: 5,
          itemsToScroll: 5,
          snapAlign: 'center',
        },
      },
    }
  },
  methods: {
    async getMovies(){
      const movies = await getMoviesAPI(this.moviesType, this.page)
      localStorage.setItem(this.moviesType, JSON.stringify(movies));
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
    }
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
    // this.loadGlider()
    // let element = (document.querySelector(`.glider-${this.moviesType}`));
    // console.log(element);
    // console.log("created");

  },
};
</script>

<style>
  .container{
    display: flex;
  }
  .card{
    width: 100px;
    height: 100%;
    padding: 5px;
    color: white;
    background-color: #18222c!important;
  }
  .card img {
        width: 100%;
  }
  .carousel__viewport{
    margin-bottom: 100px;
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
.carousel__next, .carousel__prev{
  transform: translate(0%, -50%)!important;
}

</style>