import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { RegisterUser } from 'src/app/dto/register-user';
import { NavController, ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  isPasswordVisible = false;
  constructor(private fb: FormBuilder, private navController: NavController, private auth: AuthService,
    private toast: ToastService) { 
    
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
      this.toast.presentToast("Form is not filled correctly");
      return;
    }

    console.log('Create new User')
    const newUser: RegisterUser = {
      username: this.username.value,
      email: this.email.value,
      password: this.confirmPassword.value,
    }

    try {
      const res = await this.auth.register(newUser);
      this.navController.navigateBack(['/login']);
    } catch (error) {
      
    }
  }

  isFormFilledCorrectly(): boolean{
    return this.email.valid && this.password.valid && this.password.value == this.confirmPassword.value;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = ! this.isPasswordVisible;
  }
}
