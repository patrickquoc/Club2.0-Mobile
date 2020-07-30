import { Component, OnInit, Input } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-stdlobby',
  templateUrl: './stdlobby.component.html',
  styleUrls: ['./stdlobby.component.scss'],
})
export class STDLobbyComponent implements OnInit {
  @Input()
  discussion: ShortTermDiscussion;
  constructor(private auth: AuthService) { }

  ngOnInit() {}

  async isHost() {
    return this.discussion.host == await this.auth.getUsername();
  }

  startDiscussion() {
    console.log("DISCUSSION STARTS NOW");
  }
}
