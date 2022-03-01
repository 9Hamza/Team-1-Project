import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/services/api-calls.service';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = '?api_key=ea13feb29808cba44ae41a961107c167';
const URL = 'https://api.themoviedb.org/3/movie/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  movieSelected: any = {};
  moviesNow: any = [];
  moviesPopular: any = [];
  moviesUpcoming: any = [];
  moviesTop: any = [];
  providers: any = [];
  casts: any=[];
  isdetail = false;

  constructor(private apiService: ApiCallsService, private router: Router) { }

  ngOnInit(): void { }

  getNowPlaying(){
    this.apiService.searchNowPlaying().subscribe( (response:any) => {
      this.moviesNow = response.results;
      console.log(this.moviesNow)
    })
  }
  getPopular(){
    this.apiService.searchPopular().subscribe( (response:any) => {
      this.moviesPopular = response.results;
      console.log(this.moviesPopular)
    })
  }

  getUpcoming(){
    this.apiService.searchUpcoming().subscribe( (response:any) => {
      this.moviesUpcoming = response.results;
      console.log(this.moviesPopular)
    })
  }

  getTopRated(){
    this.apiService.searchTopRated().subscribe( (response:any) => {
      this.moviesTop = response.results;
      console.log(this.moviesPopular)
    })
  }
  getMovie(id: number) {
    this.apiService.movieDetails(id).subscribe( (response:any) => {
      this.movieSelected = response;
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
