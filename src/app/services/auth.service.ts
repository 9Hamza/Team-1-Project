import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  
  userLoggedIn: boolean;      // other components can check on this variable for the login status of the user
  userID: string;
  email: string | null;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.userLoggedIn = false;
    this.userID = "emptyID";
    this.email = "emptyEmail";

    this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
      if (user) {
        this.userLoggedIn = true;
        this.userID = user.uid;
        this.email = user.email;
        console.log(user.displayName);                      // prints null 
        console.log(user.email);                            // prints actual email
        console.log(this.userID);
      } else {
        this.userLoggedIn = false;
      }
    });

  }


  onReadCollect(email:string) {
    this.afs.collection("users", ref => ref.where("email", "==", email)).get().subscribe( snaps => {
      snaps.forEach( snap => {
        this.userID = snap.id;
          // console.log(snap.id);
          // console.log(snap.data());
      })
  })
  }

  getEmail() {
    return this.email;
  }

  loginUser(email: string, password: string): Promise<any> {
    this.onReadCollect(email);
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        // this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
          return { isValid: false, message: error.message };
          else return null;
      });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();

        this.afs.doc('/users/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
          .set({
            accountType: 'endUser',
            displayName: user.displayName,
            displayName_lower: user.displayName.toLowerCase(),
            email: user.email,
            email_lower: emailLower
          });

        // result.user.sendEmailVerification();                    // immediately send the user a verification email
      })
      .catch(error => {
        console.log('Auth Service: signup error', error);
        if (error.code)
          return { isValid: false, message: error.message };
        else return null;
      });
  }

  logoutUser(): Promise<void> {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/home']);                    // when we log the user out, navigate them to home
      })
      .catch(error => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
          return error;
        else return null;
      });
  }

  getAll(){
    this.afs.collection('users').snapshotChanges().subscribe((response) => {
      console.log('response', response);
    })
  }
}
