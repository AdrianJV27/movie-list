<template>
    <div v-if="favourites">
        <button v-if="!isInFavourites" class="btn btn-success" @click="modifyFavourite('save')">⭐</button>
        <button v-else class="btn btn-success" @click="modifyFavourite('delete')">❌</button>
    </div>
</template>

<script>
export default {
    props:{
        movie:{
            required: true,
            type: Object,
        }
    },
    data(){
        return {
            favourites: [],
            isInFavourites: false,
        }
    },
    methods:{
        checkFavourites(){
            //Si no existe sera null y accederá al if para crearlo, si existe se guardara el objeto en la propiedad favourites
            this.favourites = localStorage.getItem("Favourites") && JSON.parse(localStorage.getItem("Favourites"))
            if(!this.favourites){
                localStorage.setItem("Favourites", '[]')
                this.favourites = JSON.parse(localStorage.getItem("Favourites"))
            }
        },
        modifyFavourite(operation){
                this.checkFavourites()
                switch (operation) {
                    case 'save':
                            this.favourites.push(this.movie)
                            localStorage.setItem("Favourites", JSON.stringify(this.favourites))
                        break;
                    case 'delete':
                            this.favourites = this.favourites.filter(movie => this.movie.id != movie.id)
                            localStorage.setItem("Favourites", JSON.stringify(this.favourites))
                        break;
                
                    default:
                        break;
                }
                this.movieExistInFavourites()
                this.$emit('modifiedFavourite')
        },
        movieExistInFavourites(){
            if(!!this.favourites.find(movie => this.movie.id == movie.id)){
                this.isInFavourites = true;
            }else{
                this.isInFavourites = false;
            }
        }
    },
    created(){
        this.checkFavourites()
        this.movieExistInFavourites()
    },
}
</script>

<style scoped>

</style>