import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username:['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onLogin() {
     //TODO: Toast?
     await this.auth.login(this.username.value, this.password.value);
     const loggedIn = await this.auth.isLoggedIn();
     console.log(loggedIn);
     if(loggedIn){
       this.router.navigate(['/home']);
     }
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }
}
