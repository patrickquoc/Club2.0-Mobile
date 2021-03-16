import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private navController: NavController) { }

  async ngOnInit() {

  }

  routeToLogin() {
    this.navController.navigateRoot("/login", { replaceUrl: true });
  }
}
