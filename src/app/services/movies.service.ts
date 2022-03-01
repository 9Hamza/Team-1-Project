import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Movie } from '../components/model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private db: AngularFirestore) { }

  // loadAddedMovies(): Observable<Movie>[] {
  //   this.db.doc("/users/hamzahamza@gmail.com/recommendation-preferences/sad").get().subscribe(snap => {
  //     console.log(snap.get("value"))
  //   });
  // }

  getGenres() {
    this.db.collection("/users").get().subscribe(snaps => {
      snaps.forEach(snap => {
        console.log(snap.data());
      })
    })
  }

}
