import { Injectable, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../dto/user';
import { Storage } from '@ionic/storage';
import { RegisterUser } from '../dto/register-user';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  constructor(private http: HttpService, private storage: Storage, private navController: NavController) { 
  }

  async ngOnInit(): Promise<void> {
    if(!this.isLoggedIn) {
      this.navController.navigateForward("/home", { replaceUrl: true });
    }
  }

  async register(user: RegisterUser) {
    return await this.http.registerUser(user);
  }

  async login(username: string, password: string) {
    const user = JSON.parse(await this.http.login(username, password));
    await this.storage.set('user', JSON.stringify(user));
    await this.storage.set('token', user.token);
    const expiresAt = JSON.stringify(new Date().getTime() + (4*60*60*1000));          // 4h duration
    await this.storage.set('expires_at', expiresAt);

    console.log(`Token received: ${user.token}`)
  }

  async logout() {
    await this.storage.remove('user');
    await this.storage.remove('token');
    await this.storage.remove('expires_at');
  }

  async isLoggedIn() {
    const user = await this.storage.get('user');
    return user != null && !await this.isTokenExpired();
  }

  async isTokenExpired(): Promise<boolean> {
    const token = await this.storage.get('token');
    const expiresAt = JSON.stringify(await this.storage.get('expires_at'));
    const currentTime = new Date().getTime();
    return token == null || (+expiresAt) <= currentTime;
  }

  async getUsername() {
    const user: User = JSON.parse(await this.storage.get('user'));
    return user.username;
  }

  async getToken() {
    const token = await this.storage.get('token');
    return token;
  }
}
