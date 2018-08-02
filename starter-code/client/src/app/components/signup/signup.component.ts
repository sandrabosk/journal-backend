import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpInfo = {
    username: "",
    password: ""
  };

  errorMessage: string;

  constructor( private myAuth: AuthService,
               private myRouter: Router ) { }

  ngOnInit() {
  }

  doSignUp() {
    this.myAuth
    .signup(this.signUpInfo)
    .then(resultFromApi => {
      // console.log('info:', this.signUpInfo)
        // clear form
        this.signUpInfo = { username: "", password: "" };

        // clear error message
        this.errorMessage = "";

        // redirect to /phones
        this.myRouter.navigate(["/"]);
      })
      .catch(err => {
        const parsedError = err.json();
        this.errorMessage = parsedError.message + " 😤";
      });
  } // close doSignUp()


}
