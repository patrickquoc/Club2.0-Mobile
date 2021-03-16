import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { CreateSTDDto } from 'src/app/dto/create-stddto';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { DataService } from 'src/app/service/data.service';
import { NavController, ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-stdcreation',
  templateUrl: './stdcreation.page.html',
  styleUrls: ['./stdcreation.page.scss'],
})
export class STDCreationPage implements OnInit {
  name: string = '';
  description: string = '';
  categoriesInput = new Array<any>();
  userLimit: number = 10;
  maxRounds: number = 2;
  private: boolean = false;
  password = '';
  isPasswordVisible = false;
  private username: string;

  constructor(private http: HttpService, private auth: AuthService, private navController: NavController,
    private toastService: ToastService, private dataService: DataService) { }

  async ngOnInit() { 
    this.username = await this.auth.getUsername()
  }

  async onCreate() {

    if(this.name.length < 1 || this.description.length < 1) {
      this.toastService.presentToast("Cannot create STD: At least 1 input box is empty!")
      return;
    }
    else if(this.categoriesInput.length < 1) {
      this.toastService.presentToast("Cannot create STD: Make sure you entered the categories correctly! (Enter after term)");
      return;
    }

    if (this.userLimit < 2 || this.userLimit > 10) {
      this.toastService.presentToast('Cannot create STD: Invalid participant count');
      return;
    }
    else if (this.maxRounds < 1 || this.maxRounds > 3) {
      this.toastService.presentToast('Cannot create STD: Invalid Round count');
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
    
    const std: CreateSTDDto = {
      name: this.name, 
      host: this.username,
      description: this.description,
      categories: categoriesDto,
      date: new Date(),
      privateFlag: JSON.stringify(this.private),
      totalRounds: JSON.stringify(this.maxRounds),
      userLimit: JSON.stringify(this.userLimit),
      password: this.password
    }

    try {
      const res: ShortTermDiscussion = JSON.parse(await this.http.createStd(std));
      res.users = new Array<string>();
      res.users.push(this.username);
      this.dataService.setData(res.discussionId, res);
      this.navController.navigateForward('participate/std/'+ res.discussionId, {replaceUrl: true});

    } catch (error) {
      console.error(error.error);
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = ! this.isPasswordVisible;
  }
}
