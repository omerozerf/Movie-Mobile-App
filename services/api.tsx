export const TMBD_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  }
}

// @ts-ignore
export const fetchMovies = async ({query}: {query: string}) => {
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

// @ts-ignore
export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  try {
    const response = await fetch(`${TMBD_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMBD_CONFIG.API_KEY}`, {
      method: 'GET',
      headers: TMBD_CONFIG.headers,
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}