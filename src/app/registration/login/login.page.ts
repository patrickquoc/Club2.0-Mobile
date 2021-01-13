import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private navController: NavController, private auth: AuthService,
     private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {
    this.loginForm = this.fb.group({
      username:['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    console.log(await this.auth.getToken());
    const loggedIn = await this.auth.isLoggedIn();
    if (loggedIn == true) {
      this.navController.navigateRoot('home', {replaceUrl: true});
    }
    
    const username = await this.auth.getUsername();
    this.username.setValue(username);
    
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
      if (loggedIn){
        this.navController.navigateRoot('/home', { replaceUrl:true });
      }
    } catch (error) {
      if (error instanceof ProgressEvent) {
        this.toastService.presentToast("Connection error");
      }
      this.toastService.presentToast(error.error);
      return;
     }
  }
}
