import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = '?api_key=ea13feb29808cba44ae41a961107c167';
const URL = 'https://api.themoviedb.org/3/movie/';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpClient) { 

    // $(document).ready(() => {
    //   $('#searchForm').on('submit', (e) => {
      // let searchText = $('#searchText').val();
      
    //     e.preventDefault();
    //   })
    // });


  }
  listX: any;
  ngOnInit(): void {
    // this.getMovies().subscribe(data => {
    //   this.listX = data;
    // });
    console.log(this.getMovies());
  }

  getMovies(){
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=ea13feb29808cba44ae41a961107c167&query=yo');
    // .then((response:any) => {
    //   console.log(response);
    //   let movies = response.data.results;
    //   let output = '';
    //   $.each(movies, (index, movie) => {
    //     output += `
    //       <div class="col-md-3">
    //         <div class="well text-center">
    //           <img src="${IMG_URL+movie.poster_path}" alt="NoImage.jpg">
    //           <h5>${movie.title}</h5>
    //           <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
    //         </div>
    //       </div>
    //     `;
    //   });
  
    //   $('#movies').html(output);
    // })
    // .catch((err:any) => {
    //   console.log(err);
    // });
  }

}

// function movieSelected(id){
//   sessionStorage.setItem('movieID', id);
//   window.location = 'movie.html';
//   return false;
// }