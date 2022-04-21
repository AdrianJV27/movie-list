import moviesAPI from "@/api/moviesAPI";

const getMoviesAPI = async(movie = 'popular', page = 1) => {
    const params = {
        page,
      }
    const resp = await moviesAPI.get(`/${movie}`,{params})

    // console.log(resp.data.results);

    return resp.data.results
}

export default getMoviesAPI