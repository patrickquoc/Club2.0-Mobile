import { Component, OnInit } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-stdbase',
  templateUrl: './stdbase.page.html',
  styleUrls: ['./stdbase.page.scss'],
})
export class STDBasePage implements OnInit {
  discussion: ShortTermDiscussion;
  activeComponent = new Array<boolean>(4);
  username: string;
  constructor(private route: ActivatedRoute, private socket: Socket, private auth: AuthService) { }

  async ngOnInit() {
    this.username = await this.auth.getUsername();
    if(this.route.snapshot.data['special']) {
      this.discussion = this.route.snapshot.data['special'];
    }
    this.activeComponent[0] = true;

    this.socket.connect();

    //this.socket.emit("join", {discussionId: this.discussion.discussionId, username: this.username});
  }
}
