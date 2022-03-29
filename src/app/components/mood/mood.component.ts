import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit {

  sad: string = '12, 10751, 10749';
  stressed: string = '35, 10402, 16';
  joyful: string = '28, 35, 14';
  thrilled: string = '80,53,27';
  upbeat: string = '12,10402,28';
  calm: string = '37,878,99';
  bored: string = '18, 9648, 53';
  cozy: string = '37,10749,10751';
  nostalgic: string = '37,36,10402';

  canSeeMoods = true;
  canSeeMovies = false;

  movies: any = [];
  movie: any = {};

  // Sad = '18' || '12' || '10751' || '10749'; // Drama, Adventure, Family, Romance
  // Stressed = '35' || '10749' || '10402' || '16'; // Comedy, Romance, Music, Animation 
  // Joyful = '28' || '35' || '14'; // Action, Comedy, Fantasy
  // thrillseeking = '80,878,53,27'; // Crime, Science Fiction, Thriller, Horror
  // Upbeat = '10752,10402,28'; // War, Music, Action
  // Calm = '37,878,99'; // Western, Science Fiction, Documentary
  // Bored = '27, 18, 9648, 53'; // Horror, Drama, Mystery, Thriller
  // Cozy = '37,10749,10751'; // Western, Romance, Family, Adventure
  // Nostalgic = '10752,37,36,10402'; // War, Western, History, Music

  constructor(private apiService: ApiCallsService) { }

  ngOnInit(): void {
    this.canSeeMoods = true;
    this.canSeeMovies = false;
    // this.getGenres(this.Sad);
    console.log(this.movies);
  }

  getGenres(text: string) {
    this.apiService.searchMoviesbyGenre(text).subscribe((response: any) => {
      this.movies = response.results;
      console.log(response);
      console.log(this.movies);
      console.log('CLICK WORKED');
      this.canSeeMoods = false;
      this.canSeeMovies = true;
    });
    // console.log('BEFORE');
    // console.log(this.movies);
    // console.log('AFTER');
  }

  movieSelected(id: number) {
    this.apiService.movieDetails(id).subscribe((response: any) => {
      this.movie = response;
      this.canSeeMovies = true;
      this.canSeeMoods = false;
    })
  }

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  switchScene() {
    this.canSeeMoods = true;
    this.canSeeMovies = false;
  }

  getValue(val: string) {
    console.log(val);
    this.sad = val;
  }

  getValue1(val: string) {
    console.log(val);
    this.stressed = val;
  }

  getValue2(val: string) {
    console.log(val);
    this.joyful = val;
  }

  getValue3(val: string) {
    console.log(val);
    this.thrilled = val;
  }

  getValue4(val: string) {
    console.log(val);
    this.upbeat = val;
  }

  getValue5(val: string) {
    console.log(val);
    this.calm = val;
  }

  getValue6(val: string) {
    console.log(val);
    this.bored = val;
  }

  getValue7(val: string) {
    console.log(val);
    this.cozy = val;
  }

  getValue8(val: string) {
    console.log(val);
    this.nostalgic = val;
  }
  // onTest() {
  //   console.log('CLICK WORKED :)');
  // }
}
