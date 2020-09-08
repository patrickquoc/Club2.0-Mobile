import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = "Home";
  activeView = Array<boolean>(3);

  constructor(private menuController: MenuController, private auth: AuthService, private router: Router) {
    //TODO: Trending page?
    this.activeView[2] = true;
  }

  showLTDView() {
    this.resetView();
    this.activeView[0] = true;
    this.title = "Long-term";
  }

  showSTDView() {
    this.resetView();
    this.activeView[1] = true;
    this.title = "Short-term";
  }

  showProfile() {
    this.resetView();
    this.activeView[2] = true;
    this.title = "Profile";
  }

  resetView() {
    this.activeView = Array<boolean>(3);
    this.menuController.close();
  }

  async onLogout() {
    await this.auth.logout();
    this.router.navigateByUrl('login');
  }
}
