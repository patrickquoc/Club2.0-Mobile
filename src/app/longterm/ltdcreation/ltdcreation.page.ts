import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { FormControl, Validators } from '@angular/forms';
import { CreateLTDDto } from 'src/app/dto/create-ltddto';
import { AuthService } from 'src/app/service/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-ltdcreation',
  templateUrl: './ltdcreation.page.html',
  styleUrls: ['./ltdcreation.page.scss'],
})
export class LTDCreationPage implements OnInit {
  name: string = '';
  description: string = '';
  categoriesInput = new Array<any>();
  private: boolean = false;
  password = '';
  isPasswordVisible = false;
  constructor(private http: HttpService, private auth: AuthService, private navController: NavController,
     private toastService: ToastService) { }

  ngOnInit() {
  }

  async onCreate() {
    if(this.name.length < 1 || this.description.length < 1) {
      this.toastService.presentToast("Cannot create LTD: At least 1 input box is empty!")
      return;
    }
    else if (this.categoriesInput.length < 1) {
      this.toastService.presentToast("Cannot create LTD: Make sure you entered the categories correctly! (Enter after term)");
      return;
    }

    let categoriesDto = new Array<string>();

    this.categoriesInput.map(c => {
      categoriesDto.push(c.value);
    })

    if(!this.private) {
      this.password = undefined;
    }
    else {
      if (this.password.length == 0) {
        this.toastService.presentToast("Please enter a password!");
        return;
      }
    }

    const ltd: CreateLTDDto = {
      name: this.name, 
      host: await this.auth.getUsername(),
      description: this.description,
      categories: categoriesDto,
      date: new Date(),
      password: this.password
    }

    try {
      const res = await this.http.createLtd(ltd);
      if(res != null) {
        this.toastService.presentToast('Discussion created');
        this.navController.navigateRoot("/home", {replaceUrl: true});
      }
    } catch (error) {
      this.toastService.presentToast(error.error);
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = ! this.isPasswordVisible;
  }
}
