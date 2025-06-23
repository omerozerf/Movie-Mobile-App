export const TMBD_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  }
}

export const fetchMovies = async (query: string) => {
  const endPoint = query
    ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;


  const response = await fetch(endPoint, {
    method: 'GET',
    headers: TMBD_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies! status: ${response.status}`);
  }

  const data = await response.json();

  return data.results;
}

/*

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjJlZDdhNmJiYWI2OWMwZDY1YjI3OWUwMjE0Y2NmOCIsIm5iZiI6MTc1MDY1ODEzNi43MDIwMDAxLCJzdWIiOiI2ODU4ZWM1ODI4MWE0ZTg4ZjVkMGZiOTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UsntcFiXbGY3QuXIFKDzAfgQSmYxrMv8lqSbv-oi4vw'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));

 */