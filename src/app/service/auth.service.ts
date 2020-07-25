import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../dto/user';
import { Storage } from '@ionic/storage';
import { RegisterUser } from '../dto/register-user';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpService, private storage: Storage) {  }

  async register(user: RegisterUser) {
    return await this.http.registerUser(user);
  }

  async login(username: string, password: string) {
    const user = JSON.parse(await this.http.login(username, password));
    await this.storage.set('user', JSON.stringify(user));
    await this.storage.set('token', user.token);
    const expiresAt = JSON.stringify(new Date().getTime() + 17999000);          // 5h duration - 1 sec
    await this.storage.set('expires_at', expiresAt);

    console.log(`Token received: ${user.token}`)
  }

  async isLoggedIn() {
    const user = await this.storage.get('user');
    return user != null && !await this.isTokenExpired();
  }

  async isTokenExpired() {
    const token = await this.storage.get('token');
    console.log(token);
    const expiresAt = JSON.stringify(await this.storage.get('expires_at'));
    const currentTime = new Date().getTime();
    return token == null || (+expiresAt) <= currentTime;
  }

  async getUsername() {
    const user: User = JSON.parse(await this.storage.get('user'));
    return user.username;
  }
}
