import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { FormControl, Validators } from '@angular/forms';
import { CreateLTDDto } from 'src/app/dto/create-ltddto';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ltdcreation',
  templateUrl: './ltdcreation.page.html',
  styleUrls: ['./ltdcreation.page.scss'],
})
export class LTDCreationPage implements OnInit {
  name: string = '';
  description: string = '';
  categories = new Array<string>();
  constructor(private http: HttpService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onCreate() {
    if(this.name.length < 1 || this.description.length < 1 || this.categories.length < 1) {
      //TODO: Validator? Or Toast?
      console.log('At least 1 input box is empty');
    }

    const ltd: CreateLTDDto = {
      name: this.name, 
      host: await this.auth.getUsername(),
      description: this.description,
      categories: this.categories,
      date: new Date()
    }

    console.log(ltd)
    console.log(ltd.categories)
    const res = await this.http.createLtd(ltd);
    if(res == 'Created') {
      console.log('LTD Creation successful');
      this.router.navigate(['/home'])
    }
  }
}
