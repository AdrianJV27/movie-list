
<template>
  <div v-if="width > 1024" class="card " style="width: 18rem;">
            <div class="test"><img :src="imageUrl(movie.poster_path)" class="card-img-top" alt="..."></div>
            <div class="card-body">
              <h5 class="card-title">{{movie.title}}</h5>
              <p class="card-text">{{description(movie.overview)}}</p>
            </div>
            <div class="row">
              <div class="col-8">
                <router-link class="btn btn-success" :to="{name:'movie', params: { id: movie.id }}"> 
                  See more...
                </router-link>
              </div>
              <div class="col-4">
                <FavoritesButton @modifiedFavourite="modifiedFavourite()" :movie="movie"/>
              </div>
            </div>
          </div>

          <div v-else class="p-3" style="">
            <router-link class="" :to="{name:'movie', params: { id: movie.id }}"> 
            <img :src="imageUrl(movie.poster_path)" 
                  @mouseover="isHovering = true" 
                  @mouseout="isHovering = false" 
                  class="img-movie-mobile card-img-top rounded"
                  :class="{'border border-3 border border-success': isHovering}" 
                  alt="...">
            <!-- <div class="card-body">
              <h5 class="card-title">{{movie.title}}</h5>
              <p class="card-text">{{description(movie.overview)}}</p>
            </div> -->
            </router-link>
          </div>
</template>

<script>
import FavoritesButton from '@/components/FavoritesButton'

export default {

    props:{
        movie:{
            type: Object,
            required: true
        },
    },
    data(){
        return {
            width: window.innerWidth, 
            height: window.innerHeight,
            isHovering: false
        }
    },
    components:{
        FavoritesButton
    },
    methods:{
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
        modifiedFavourite(){
          this.$emit('modifiedFavourite')
        }
    },
    created(){
        window.addEventListener("resize", this.onResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },

}
</script>

<style scoped>
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
/* .carousel__viewport{
  margin-bottom: 30px;
} */
img{
  width: 100%;
}
.img-movie-mobile:hover{
  
}
</style>