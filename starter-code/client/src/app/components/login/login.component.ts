import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo = {
    username: "",
    password: ""
  };
  theUser:any = {};

  loginErrorMessage: string;

  constructor( private myAuth: AuthService,
               private myRouter: Router ) { }

  ngOnInit() {
    this.myAuth
    .checklogin()
    // If success, we are logged in.
    .then(resultFromApi => {
      this.theUser = resultFromApi;
      this.myRouter.navigate(["/"]);
    })

    // Even if you don't do anything on error, catch to avoid a console error.
    .catch(err => {
      console.log(err);
    });
  }

  doLogin(){
    return this.myAuth.login(this.loginInfo)
    .then( () => {
       // clear the form
       this.loginInfo = {
        username: '',
        password: ''
      };

      // clear the error message
      this.loginErrorMessage = "";

      // redirect to /phones
      this.myRouter.navigate(['/']);
    } )
    .catch( err => {
      const parsedError = err.json();
      this.loginErrorMessage = parsedError.message + ' 😤';
    } )
  }

}
