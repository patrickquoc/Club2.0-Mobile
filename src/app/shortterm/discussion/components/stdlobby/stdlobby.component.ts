import { Component, OnInit, Input } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { AuthService } from 'src/app/service/auth.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-stdlobby',
  templateUrl: './stdlobby.component.html',
  styleUrls: ['./stdlobby.component.scss'],
})
export class STDLobbyComponent implements OnInit {
  @Input()
  discussion: ShortTermDiscussion;
  username: string;
  constructor(private auth: AuthService, private socket: Socket) { }

  async ngOnInit() {
    this.username = await this.auth.getUsername()
  }

  isHost() {
    return this.discussion.host == this.username;
  }

  startDiscussion() {
    this.socket.emit("forceStartDiscussion");
  }
}
