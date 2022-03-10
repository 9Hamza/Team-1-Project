import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ // This service can be injectable in other components ( like when we used it in search or moods )
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http: HttpClient) { }

  searchMovies(searchText: string) {
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=ea13feb29808cba44ae41a961107c167&query=' + searchText);
  }

  movieDetails(id: any) {
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=ea13feb29808cba44ae41a961107c167');
  }

  watchFeature(id: any) {
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '/watch/providers?api_key=ea13feb29808cba44ae41a961107c167');
  }

  getCast(id: any) {
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=ea13feb29808cba44ae41a961107c167');
  }

  searchMoviesbyGenre(genres: string) {
    return this.http.get('https://api.themoviedb.org/3/discover/movie?api_key=ea13feb29808cba44ae41a961107c167&language=en-US&with_genres=' + genres);
  }

  searchNowPlaying() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=ea13feb29808cba44ae41a961107c167&language=en-US&page=1')
  }

  searchPopular() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=ea13feb29808cba44ae41a961107c167&language=en-US&page=1')
  }
  searchUpcoming() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=ea13feb29808cba44ae41a961107c167&language=en-US&page=1')
  }
  searchTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=ea13feb29808cba44ae41a961107c167&language=en-US&page=1')
  }
}
