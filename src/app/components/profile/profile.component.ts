import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

interface User {
  accountType: string;
  displayName: string;
  displayName_lower: string;
  email: string | null;
  email_lower: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, User {

  constructor(private afs: AngularFirestore, private as: AuthService) { }

  accountType = '';
  displayName= '';
  displayName_lower= '';
  email: string | null = "nothing";
  email_lower= '';
  userID = '';

  ngOnInit(): void {
    this.email = this.as.getEmail();
    console.log(this.as.getEmail());
  }

  onReadCollectEach() {
    this.afs.collection("users").get().subscribe( snaps => {
        snaps.forEach( snap => {
          this.displayName = snap.id;
            // console.log(snap.id);
            // console.log(snap.data());
        })
    })
}
  onReadCollect(email:string) {
    this.afs.collection("users", ref => ref.where("email", "==", email)).get().subscribe( snaps => {
      snaps.forEach( snap => {
        this.displayName = snap.id;
          // console.log(snap.id);
          // console.log(snap.data());
      })
  })
  }

  onReadCollection(){
    this.afs.collection("users").get().subscribe( snaps => {
        snaps.forEach( snap => {
            console.log(snap.id);
            console.log(snap.data());
        })
    })
}
  
}
