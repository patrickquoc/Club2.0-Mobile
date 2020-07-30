import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { CreateSTDDto } from 'src/app/dto/create-stddto';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';

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
  private: boolean = false;
  password = '';
  isPasswordVisible = false;

  constructor(private http: HttpService, private auth: AuthService, private router: Router) { }

  ngOnInit() { }

  async onCreate() {

    if(this.name.length < 1 || this.description.length < 1 || this.categoriesInput.length < 1) {
      //TODO: Validator? Or Toast?
      console.log('At least 1 input box is empty');
      return;
    }
    console.log(this.userLimit)
    if (this.userLimit < 2 || this.userLimit > 10) {
      console.log('Invalid participant count');
      return;
    }
    
    let categoriesDto = new Array<string>();

    this.categoriesInput.map(c => {
      categoriesDto.push(c.value);
    })

    if(!this.private) {
      console.log(this.private)
      this.password = undefined;
    }
    
    const std: CreateSTDDto = {
      name: this.name, 
      host: await this.auth.getUsername(),
      description: this.description,
      categories: categoriesDto,
      date: new Date(),
      privateFlag: JSON.stringify(this.private),
      userLimit: JSON.stringify(this.userLimit),
      password: this.password
    }

    try {
      const res: any = JSON.parse(await this.http.createStd(std));
      //await this.http.joinStd(res.discussionId, await this.auth.getUsername(), this.password);

    } catch (error) {
      console.error("Connection to room could not be established: "+ error.error);
    }
  }

  togglePasswordVisibility() {
    console.log('Visibility changed'); 
    this.isPasswordVisible = ! this.isPasswordVisible;
  }
}
