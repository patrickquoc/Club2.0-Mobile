import { Component, OnInit } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SocketService } from 'src/app/service/socket.service';
import { HttpService } from 'src/app/service/http.service';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdbase',
  templateUrl: './stdbase.page.html',
  styleUrls: ['./stdbase.page.scss'],
})
export class STDBasePage implements OnInit {
  discussion: ShortTermDiscussion;
  roundArguments: STDArgument[];
  resultArguments: STDArgument[];
  allArguments: Array<STDArgument[]>
  activeComponent = new Array<boolean>(5);
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
      this.activateComponent(1);
    });

    this.socket.getRoundArguments().subscribe(args => {
      this.roundArguments = args;
      console.log(this.roundArguments);
      this.activateComponent(2);
    });

    this.socket.getRoundResult().subscribe(args => {
      this.resultArguments = args;
      this.activateComponent(3);
    })

    this.socket.endOfDiscussion().subscribe(args => {
      this.allArguments = args;
      this.activateComponent(4);
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
    this.resetActiveComponents();
    this.socket.startDiscussion(this.discussion.discussionId, this.discussion.totalRounds);
  }

  resetActiveComponents() {
    this.activeComponent = Array<boolean>(5);
  }

  activateComponent(index: number) {
    this.resetActiveComponents();
    this.activeComponent[index] = true;
  }

  onArgumentFinished(argument) {
    this.socket.sendArgument(this.discussion.discussionId, this.username, argument);
    console.log("Waiting for others to finish writing argument.")
    //TODO: Loading screen?
  }

  onRatingFinished(ratedArguments) {
    console.log(ratedArguments);
    this.socket.submitArgumentRating(this.discussion.discussionId, ratedArguments);
    console.log("rating submitted")
    //TODO: Round finished
    //this.resetActiveComponents();
    //this.activeComponent[3] = true;
  }
}
