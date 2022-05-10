import axios from 'axios';

// base da url: https://api.themoviedb.org/3/
// url: https://api.themoviedb.org/3/movie/now_playing?api_key=85ad32cb20468967bf25128a18acec69&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;