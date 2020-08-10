import { Component, OnInit } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SocketService } from 'src/app/service/socket.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-stdbase',
  templateUrl: './stdbase.page.html',
  styleUrls: ['./stdbase.page.scss'],
})
export class STDBasePage implements OnInit {
  discussion: ShortTermDiscussion;
  activeComponent = new Array<boolean>(4);
  username: string;
  currentRound = 1;
  constructor(private route: ActivatedRoute, private socket: SocketService, private auth: AuthService, private http: HttpService,
    private router: Router) { }

  async ngOnInit() {
    this.username = await this.auth.getUsername();
    if(this.route.snapshot.data['special']) {
      this.discussion = this.route.snapshot.data['special'];
    }
    this.activeComponent[0] = true;

    this.socket.connect();
    this.socket.joinRoom(this.discussion.discussionId, this.username);

    this.socket.userJoined().subscribe(username => {
      try {
        const user: string = JSON.parse(username as any);
        this.discussion.users.push(user);
      } catch (error) {
        console.error("userJoined: Failed to parse incoming data: "+ error.error);
      }
    });

    this.socket.discussionStarts().subscribe(() => {
      this.resetActiveComponents();
      this.activeComponent[1] = true;
    })
  }

  leaveRoom() {
    this.socket.disconnect();
    try {
      const res = this.http.leaveStd(this.discussion.discussionId, this.username);
    } catch (error) {
      console.error("Failed to leave STD: "+ error.text);
    }
  }

  onStart() {
    console.log("gogo");
    this.resetActiveComponents();
    this.socket.startDiscussion(this.discussion.discussionId, this.discussion.totalRounds);
  }

  resetActiveComponents() {
    this.activeComponent = Array<boolean>(3);
  }

  onArgumentFinished() {
    this.resetActiveComponents();
    this.activeComponent[2] = true;
  }

  onRatingFinished() {
    
  }
}
