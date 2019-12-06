import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../security/service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  errorLogin: boolean;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home', 'home', 'trip', 'list']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  logIn() {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password)
      .subscribe(token => {
        this.router.navigate(['home']);
      },
        error => {
            this.errorLogin = true;
            this.errorMsg = error;
        }
      );
  }

}
