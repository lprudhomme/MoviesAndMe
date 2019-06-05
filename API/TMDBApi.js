const API_TOKEN = "7fda1ff42eab59d4d4477ea8e4dd5ce5"

export function getFilmsFromApiWithSearchedText (text, page) {
  // construit l'URL d'appel search de l'API avec : le token, la langue fr, le texte recherché et le n° de la page
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}

export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getNewsFromApi(page) {
  return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' + page)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
