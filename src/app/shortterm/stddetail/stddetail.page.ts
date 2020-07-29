import { Component, OnInit } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-stddetail',
  templateUrl: './stddetail.page.html',
  styleUrls: ['./stddetail.page.scss'],
})
export class STDDetailPage implements OnInit {
  selectedDiscussion: ShortTermDiscussion;
  constructor(private route: ActivatedRoute, private http: HttpService, private auth: AuthService) { }

  ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.selectedDiscussion = this.route.snapshot.data['special'];
    }

    console.log(this.selectedDiscussion);
  }

  async joinStd() {
    console.log("Joining STD");

    if(this.selectedDiscussion.privateFlag) {
      
    }

    try {
      const res = await this.http.joinStd(this.selectedDiscussion.discussionId, await this.auth.getUsername());
    } catch (error) {
      console.error("Connection failed: "+ error);
    }
  }
}
