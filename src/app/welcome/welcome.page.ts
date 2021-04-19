import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  constructor(private navController: NavController) { }

  routeToLogin() {
    this.navController.navigateRoot("/login", { replaceUrl: true });
  }
}
