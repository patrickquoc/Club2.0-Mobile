import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private toastController: ToastController) { }

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
     try {
      await this.auth.login(this.username.value, this.password.value);
      const loggedIn = await this.auth.isLoggedIn();
      if(loggedIn){
        this.router.navigate(['/home']);
      }
     } catch (error) {
      this.presentToast(error.error);
      return;
     }
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
