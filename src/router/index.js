import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/pelicula/:id',
    name: 'movie',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Movie.vue'),
    //Podria probar que si no me envian el objeto de movie entonces hacer la peticion api a traves de la ID y 
    //si no unicamente deberia pasar el objeto en forma de JSON y despues transformarlo en objeto de javascript de nuevo
    props: ( route ) => {
      const id = Number(route.params.id)
      return isNaN( id ) ? { id: 1} : { id }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router