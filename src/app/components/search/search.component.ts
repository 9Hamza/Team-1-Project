import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/services/api-calls.service';


const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = '?api_key=ea13feb29808cba44ae41a961107c167';
const URL = 'https://api.themoviedb.org/3/movie/';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies: any = [];
  movie: any = {};
  providers: any = [];
  provider: any = {};
  casts: any=[];
  cast: any={};
  isdetail = false;

  constructor(private apiService: ApiCallsService, private router: Router) { }

  ngOnInit(): void { }

  getMovies(event: Event){
    this.apiService.searchMovies((<HTMLInputElement>event.target).value).subscribe( (response: any) => {
      this.movies = response.results;
      console.log(this.movies)
    })
  }

  movieSelected(id: number) {
    this.apiService.movieDetails(id).subscribe( (response:any) => {
      this.movie = response;
      this.isdetail = true;
    })

    this.apiService.watchFeature(id).subscribe( (response:any) => {
      this.providers = response.results.US.buy;
    })

    this.apiService.getCast(id).subscribe( (response:any) => {
      this.casts = response.cast;
      console.log(response);
    })
  }

  
}
