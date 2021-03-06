import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { getAuth, updateProfile } from "firebase/auth";


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    isProgressVisible: boolean;
    signupForm: FormGroup = new FormGroup({});
    firebaseErrorMessage: string;

    constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
        this.isProgressVisible = false;
        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        if (this.authService.userLoggedIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
            this.router.navigate(['']);
        }

        this.signupForm = new FormGroup({
            'displayName': new FormControl('', Validators.required),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });  
    }

    signup() {
        if (this.signupForm.invalid)                            // if there's an error in the form, don't submit it
            return;

        this.isProgressVisible = true;
        this.authService.signupUser(this.signupForm.value).then((result) => {
            if (result == null)                                 // null is success, false means there was an error
                this.router.navigate(['moodform']);
            else if (result.isValid == false)
                this.firebaseErrorMessage = result.message;

            this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
        }).catch(() => {
            this.isProgressVisible = false;
        });
    }

    // _updateUserData(){
    //     var userNow = this.afAuth.currentUser;
    //       userNow.updateProfile({
    //       displayName: "Jane Q. User",
    //       photoURL: "https://example.com/jane-q-user/profile.jpg"
    //     }).then(function() {
    //       var displayName = userNow.displayName;
    //       var photoURL = userNow.photoURL;
    //     }, function(error) {
  
    //     });
    // }
}
