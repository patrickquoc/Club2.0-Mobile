import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { FormControl, Validators } from '@angular/forms';
import { CreateLTDDto } from 'src/app/dto/create-ltddto';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ltdcreation',
  templateUrl: './ltdcreation.page.html',
  styleUrls: ['./ltdcreation.page.scss'],
})
export class LTDCreationPage implements OnInit {
  name: string = '';
  description: string = '';
  categoriesInput = new Array<any>();
  constructor(private http: HttpService, private auth: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async onCreate() {
    if(this.name.length < 1 || this.description.length < 1 || this.categoriesInput.length < 1) {
      //TODO: Validator? Or Toast?
      console.log('At least 1 input box is empty');
    }

    let categoriesDto = new Array<string>();

    this.categoriesInput.map(c => {
      categoriesDto.push(c.value);
    })

    const ltd: CreateLTDDto = {
      name: this.name, 
      host: await this.auth.getUsername(),
      description: this.description,
      categories: categoriesDto,
      date: new Date()
    }

    try {
      const res = await this.http.createLtd(ltd);
      if(res == 'Created') {
        this.presentToast('Discussion created');
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    } catch (error) {
      this.presentToast(error.error);
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
