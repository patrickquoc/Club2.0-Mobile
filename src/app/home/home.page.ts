import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = "Home";
  activeView = Array<boolean>(3);

  constructor(private menuController: MenuController) {
    //TODO: Remove if trending page exist
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

  resetView() {
    this.activeView = Array<boolean>(3);
    this.menuController.close();
  }
}
