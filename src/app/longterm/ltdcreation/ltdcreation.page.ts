import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-ltdcreation',
  templateUrl: './ltdcreation.page.html',
  styleUrls: ['./ltdcreation.page.scss'],
})
export class LTDCreationPage implements OnInit {
  categories = new Array<string>()
  constructor(private http: HttpService) { }

  ngOnInit() {
  }
}
