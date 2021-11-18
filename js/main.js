const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const API_KEY = '?api_key=ea13feb29808cba44ae41a961107c167'
const URL = 'https://api.themoviedb.org/3/movie/'

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
  let searchText = $('#searchText').val();
  getMovies(searchText);
    e.preventDefault();
  })
});

function getMovies(searchText){
  axios.get('https://api.themoviedb.org/3/search/multi?api_key=ea13feb29808cba44ae41a961107c167&query='+searchText)
  .then((response) => {
    console.log(response);
    let videos = response.data.results;
    let output = '';

    $.each(videos, (index, video) => {
      let videoPoster = '';
      if (video.poster_path ==null){videoPoster = "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";}
      else {videoPoster = IMG_URL+video.poster_path;}
      let mediaHldr ='';
      if (video.media_type =='movie') {output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="${videoPoster}" style="width:207px;height:310px;">
          <h5>${video.original_title}</h5>
          <a onclick="movieSelected('${video.id}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
    `; }
      else if(video.media_type == 'tv') {output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="${videoPoster}" style="width:207px;height:310px;">
          <h5>${video.original_name}</h5>
          <a onclick="showSelected('${video.id}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
    `;}
      
    });

    $('#movies').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}

function movieSelected(id){
  sessionStorage.setItem('movieID', id);
  window.location = 'movie.html';
  return false;
}

function showSelected(id){
  sessionStorage.setItem('showID', id);
  window.location = 'show.html';
  return false;
}

function getMovie(){
  let movieID = sessionStorage.getItem('movieID');

  axios.get('https://api.themoviedb.org/3/movie/' + movieID + '?api_key=ea13feb29808cba44ae41a961107c167')
  .then((response) => {
    console.log(response);
    let movie = response.data;
    let output = ``;
    genreList = '';
    $.each(movie.genres, function(n, obj){
      genreList+=obj['name'] + '  ';
    });

    let moviePoster = '';
    if (movie.poster_path == null){moviePoster = "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";}
    else {moviePoster = IMG_URL+movie.poster_path;}

    let movieBudget = '';
    if(movie.budget==null || movie.budget == 0) {movieBudget = 'Not Available';}
    else {movieBudget = '$' + movie.budget;}
    output +=`
      <div class="row">
        <div class="col-md-4">
          <img src="${moviePoster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${genreList}</li>
            <li class="list-group-item"><strong>Language:</strong> ${movie.original_language}</li>
            <li class="list-group-item"><strong>Release Date:</strong> ${movie.release_date}</li>
            <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime}</li>
            <li class="list-group-item"><strong>Tagline:</strong> ${movie.tagline}</li>
            <li class="list-group-item"><strong>Budget:</strong> ${movieBudget}</li>
            <li class="list-group-item"><strong>Vote Average:</strong> ${movie.vote_average}</li>
            <li class="list-group-item"><strong>Creator Page: </strong><a href="${movie.homepage}">${movie.homepage}</a></li>
          </ul>
          <br>
          <h4>Description</h4>
          <p>${movie.overview}</p>
        </div>
      </div>
    `;
    $('#movie').html(output);
  })

  axios.get('https://api.themoviedb.org/3/movie/' + movieID + '/credits?api_key=ea13feb29808cba44ae41a961107c167')
  .then((response) => {
    let credits = response.data.cast;
    let output = ` 
    <div>
      <br>
      <h4>Top Cast</h4>
      <div class="scrolling-wrapper">
    `;
    $.each(credits, (index, credit) => {
      let creditProfile = '';
      if (credit.profile_path==null){creditProfile = "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";}
      else {creditProfile = IMG_URL+credit.profile_path;}
      output += `
      <div class="card">
      <img src="${creditProfile}" id="profile">
      <p align="center">${credit.name}</p>
      </div>
      `;
      if(credit.order == 8) {
        return false; 
      }
    });
    output += `
    </div>
    </div>
    `;
    $('#cast').html(output);
  })

  axios.get('https://api.themoviedb.org/3/movie/' + movieID + '/watch/providers?api_key=ea13feb29808cba44ae41a961107c167')
  .then((response) => {
    let sources = response.data.results.US.buy;
    let output = `
      <div>
        <br>
        <h4>Watch</h4>
    `;

    $.each(sources, (index, source) => {
      let sourceLogo = '';
      if (source.logo_path==null){sourceLogo = "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";}
      else {sourceLogo = IMG_URL+source.logo_path;}
      output += `
        <img src="${sourceLogo}" id="logo">  
      `;
    });

    output += `
      <hr> 
      <a href="index.html" class="btn btn-default">Go Back To Search</a>
      </div>
    `;

    $('#sources').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}

function getShow(){
  let showID = sessionStorage.getItem('showID');

  axios.get('https://api.themoviedb.org/3/tv/' + showID + '?api_key=ea13feb29808cba44ae41a961107c167')
  .then((response) => {
    console.log(response);
    let show = response.data;

    genreList = '';
    $.each(show.genres, function(n, obj){
      genreList+=obj['name'] + '  ';
    });

    let showPoster = '';
    if (show.poster_path == null){showPoster = "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";}
    else {showPoster = IMG_URL+show.poster_path;}

    let output =`
      <div class="row">
        <div class="col-md-4">
          <img src="${showPoster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${show.name}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${genreList}</li>
            <li class="list-group-item"><strong>Language:</strong> ${show.original_language}</li>
            <li class="list-group-item"><strong>Episode Runtime:</strong> ${show.episode_run_time}</li>
            <li class="list-group-item"><strong>First Air Date:</strong> ${show.first_air_date}</li>
            <li class="list-group-item"><strong>Last Air Date:</strong> ${show.last_air_date}</li>
            <li class="list-group-item"><strong>Vote Average:</strong> ${show.vote_average}</li>
            <li class="list-group-item"><strong>Creator Page: </strong><a href="${show.homepage}">${show.homepage}</a></li>
          </ul>
          <br>
          <h4>Description</h4>
          <p>${show.overview}</p>
        </div>
      </div>
    `;

    $('#show').html(output);
  })

  axios.get('https://api.themoviedb.org/3/tv/' + showID + '/credits?api_key=ea13feb29808cba44ae41a961107c167')
  .then((response) => {
    let credits = response.data.cast;
    let output = ` 
    <div>
      <br>
      <h4>Top Cast</h4>
      <div class="scrolling-wrapper">
    `;
    $.each(credits, (index, credit) => {
      let creditProfile = '';
      if (credit.profile_path==null){creditProfile = "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";}
      else {creditProfile = IMG_URL+credit.profile_path;}
      output += `
      <div class="card">
      <img src="${creditProfile}" id="profile">
      <p align="center">${credit.name}</p>
      </div>
      `;
      if(credit.order == 8) {
        return false; 
      }
    });
    output += `
    </div>
    </div>
    `;
    $('#cast').html(output);
  })

  axios.get('https://api.themoviedb.org/3/tv/' + showID + '/watch/providers?api_key=ea13feb29808cba44ae41a961107c167')
  .then((response) => {
    let sources = response.data.results.US.flatrate;
    let output = `
      <div>
        <br>
        <h4>Watch</h4>
    `;

    $.each(sources, (index, source) => {
      let sourceLogo = '';
      if (source.logo_path==null){sourceLogo = "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";}
      else {sourceLogo = IMG_URL+source.logo_path;}
      output += `
        <img src="${sourceLogo}" id="logo">  
      `;
    });

    output += `
      <hr> 
      <a href="index.html" class="btn btn-default">Go Back To Search</a>
      </div>
    `;

    $('#sources').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}



