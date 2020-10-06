import { Component, OnInit } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { STDArgument } from 'src/app/entity/stdargument';
import { SocketService } from 'src/app/service/socket.service';
import { NgControlStatus } from '@angular/forms';

@Component({
  selector: 'app-stdbase',
  templateUrl: './stdbase.page.html',
  styleUrls: ['./stdbase.page.scss'],
})
export class STDBasePage implements OnInit {
  //TODO: Refactor fields
  private componentCount = 8;
  discussion: ShortTermDiscussion;
  roundArguments: STDArgument[];
  resultArguments: STDArgument[];
  allArguments: Array<STDArgument[]>;
  randomArgument: STDArgument;
  roundComments: Array<STDArgument>;
  resultComments: Array<STDArgument>;
  activeComponent = new Array<boolean>(this.componentCount);
  username: string;
  isHost: boolean;

  constructor(private route: ActivatedRoute, private socket: SocketService, private auth: AuthService, private http: HttpService ) { }

  async ngOnInit() {
    this.username = await this.auth.getUsername();
    if(this.route.snapshot.data['special']) {
      this.discussion = this.route.snapshot.data['special'];
    }
    this.activeComponent[0] = true;
    this.isHost = this.username == this.discussion.host;

    this.socket.connect();
    this.socket.joinRoom(this.discussion.discussionId, this.username);

    this.socket.userJoined().subscribe(username => {
      try {
        console.log(username+ " joined room.")
        this.discussion.users.push(username);
      } catch (error) {
        console.error("userJoined: Failed to parse incoming data: "+ error);
      }
    });

    this.socket.discussionStarts().subscribe(() => {
      this.activateComponent(1);
    });

    this.socket.getRoundArguments().subscribe(args => {
      this.roundArguments = args;
      this.activateComponent(2);
    });

    this.socket.getRoundResult().subscribe(args => {
      console.log("Received Round result");
      this.resultArguments = args;
      this.activateComponent(3);
    });

    this.socket.endOfDiscussion().subscribe(args => {
      this.allArguments = args;
      this.activateComponent(4);
    }); 

    this.socket.nextRound().subscribe(arg => {
      this.randomArgument = arg;
      this.activateComponent(5);
    });

    this.socket.getRoundComments().subscribe(comments => {
      console.log(comments);
      this.roundComments = comments;
      this.activateComponent(6);
    });

    this.socket.getResultComments().subscribe(comments => {
      this.resultComments = comments;
      this.activateComponent(7);
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
    this.activeComponent = Array<boolean>(this.componentCount);
  }

  activateComponent(index: number) {
    this.resetActiveComponents();
    this.activeComponent[index] = true;
  }

  onArgumentFinished(argument) {
    this.socket.sendArgument(this.discussion.discussionId, this.username, argument);
    console.log("Waiting for others to finish writing argument.")
    //TODO: Loading bar/screen?
  }

  onRatingFinished(ratedArguments) {
    this.socket.submitArgumentRating(ratedArguments);
    console.log("rating submitted");
  }

  onCommentFinished(comment: string) {
    this.socket.sendComment(this.discussion.discussionId, this.username, comment, this.randomArgument.text);
  }

  onCommentRatingFinished(comments: STDArgument[]) {
    //this.socket.sendCommentRating(comments);
    this.socket.submitArgumentRating(comments);
  }

  forceStartNextRound() {
    this.socket.forceStartNextRound(this.discussion.discussionId);
  }
}
