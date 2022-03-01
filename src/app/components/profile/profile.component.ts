import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { getDatabase } from 'firebase/database'

import { getAuth } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // A constructor is supposed to be for injecting things like services 
  constructor(
    private db: AngularFireDatabase,
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private as: AuthService,
    private movieService: MoviesService) { }

  accountType = '';
  displayName = '';
  displayName_lower = '';
  email: string | null = "nothing";
  email_lower = '';
  userID = '';

  ngOnInit(): void { // ngOnInit is where you want to do your initializations (things like fetching stuff)
    const auth = getAuth();
    const user = auth.currentUser;
    this.email = this.as.getEmail();
    this.getDisplayName();
    // console.log(this.displayName);               // Returns nothing
    // console.log(this.as.getAll());               // Returns UNDEFINED
    // console.log(auth.currentUser?.displayName);  // Returns NULL
    this.as.getMovieList();
    this.as.getDisplayName();
    // this.as.getGenres();
  }

  // onReadCollectEach() {
  //   this.afs.collection("users").get().subscribe(snaps => {
  //     snaps.forEach(snap => {
  //       this.displayName = snap.id;
  //       // console.log(snap.id);
  //       // console.log(snap.data());
  //     })
  //   })
  // }
  // onReadCollect(email: string) {
  //   this.afs.collection("users", ref => ref.where("email", "==", email)).get().subscribe(snaps => {
  //     snaps.forEach(snap => {
  //       this.displayName = snap.id;
  //       // console.log(snap.id);
  //       // console.log(snap.data());
  //     })
  //   })
  // }

  onReadCollection() {
    this.afs.collection("users").get().subscribe(snaps => {
      snaps.forEach(snap => {
        console.log(snap.id);
        console.log(snap.data());
      })
    })
  }

  getDisplayName() {
    this.afs.doc("users/" + this.email).get().subscribe(snap => {
      console.log(snap.get("displayName"));
      this.displayName = snap.get("displayName");
      console.log(this.displayName);
    })
  }

}