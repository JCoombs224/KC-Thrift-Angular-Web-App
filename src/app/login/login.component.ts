import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {}

  login() {
    // this will show the fields not filled in as an error
    this.loginForm.markAllAsTouched();

    // Check if all fields are filled
    if(this.loginForm.valid) {
      this.authService.SignIn(this.username.value, this.password.value);
    }
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
