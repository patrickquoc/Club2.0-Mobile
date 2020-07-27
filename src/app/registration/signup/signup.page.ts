import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { RegisterUser } from 'src/app/dto/register-user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
   
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { 
    
  }


  ngOnInit() {
    this.signupForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      username:['', [Validators.required]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/,
        ),]
      ],
      confirmPassword: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/,
        ),]
      ],
    })
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get username() {
    return this.signupForm.get('username');
  }

  async onSignUp() {
    if (!this.isFormFilledCorrectly()) {
      //TODO: Present Toast
      return;
    }

    console.log('Create new User')
    const newUser: RegisterUser = {
      username: this.username.value,
      email: this.email.value,
      password: this.confirmPassword.value,
    }

    const res = await this.auth.register(newUser);
    console.log(res);
    console.log(res);
    this.router.navigate(['/login']);
  }

  isFormFilledCorrectly(): boolean{
    return this.email.valid && this.password.valid && this.password.value == this.confirmPassword.value;
  }
}
