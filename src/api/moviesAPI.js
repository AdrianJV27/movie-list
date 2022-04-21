import axios from 'axios'

const moviesAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    method: 'get',
    params:{
        api_key: '5cf3252038d09fe1332c49bd017b000f',
    }
})

export default moviesAPI