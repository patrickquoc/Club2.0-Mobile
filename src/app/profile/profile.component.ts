import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() username: string;

  constructor(private auth: AuthService, private navController: NavController) { }

  async ngOnInit() {
    this.username = await this.auth.getUsername();
  }

  routeTo(index: number) {
    switch(index) {
      case 0: {
        console.log("Route to Short-term discussion History");
        this.navController.navigateForward('stdhistory');
        break;
      }
      case 1: {
        console.log("Preferences");
        break;
      }
      case 2: {
        console.log("Route to Saved discussions");
        break;
      }
      case 3: {
        console.log("Route to About");
        break;
      }
    }
  }
}
