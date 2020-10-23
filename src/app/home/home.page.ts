import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = "Home";
  activeView = Array<boolean>(3);

  constructor(private menuController: MenuController, private auth: AuthService, private navController: NavController) {
    //TODO: Trending page?
    this.activeView[0] = true;
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
    this.navController.navigateBack("/login", { replaceUrl: true })
  }
}
