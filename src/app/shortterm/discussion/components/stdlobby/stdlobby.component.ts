import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { AuthService } from 'src/app/service/auth.service';
import { SocketService } from 'src/app/service/socket.service';
@Component({
  selector: 'app-stdlobby',
  templateUrl: './stdlobby.component.html',
  styleUrls: ['./stdlobby.component.scss'],
})
export class STDLobbyComponent implements OnInit {
  @Input() discussion: ShortTermDiscussion;
  @Output() start = new EventEmitter<boolean>();
  username: string;
  constructor(private auth: AuthService) { }

  async ngOnInit() {
    this.username = await this.auth.getUsername();
    console.log(this.discussion);
  }

  isHost() {
    return this.discussion.host == this.username;
  }

  startDiscussion() {
    this.start.emit(true);
  }
}
