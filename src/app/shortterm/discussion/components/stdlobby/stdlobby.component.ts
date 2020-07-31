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
  username: string;
  constructor(private auth: AuthService) { }

  async ngOnInit() {
    this.username = await this.auth.getUsername()
  }

  isHost() {
    console.log(this.discussion.host == this.username)
    return this.discussion.host == this.username;
  }

  startDiscussion() {
    console.log("DISCUSSION STARTS NOW");
  }
}
