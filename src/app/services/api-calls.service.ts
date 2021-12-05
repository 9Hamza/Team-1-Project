import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http:HttpClient) { }

  searchMovies(searchText: string) {
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=ea13feb29808cba44ae41a961107c167&query='+searchText);
  }

  movieDetails(id:any) {
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=ea13feb29808cba44ae41a961107c167');
  }

  watchFeature(id:any) {
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '/watch/providers?api_key=ea13feb29808cba44ae41a961107c167');
  }

  getCast(id:any){
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=ea13feb29808cba44ae41a961107c167');
  }
}
