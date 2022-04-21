import moviesAPI from "@/api/moviesAPI";

const getMovieAPI = async(id= 1) => {

    const resp = await moviesAPI.get(`/${id}`)

    // console.log(resp);

    return resp.data
}

export default getMovieAPI