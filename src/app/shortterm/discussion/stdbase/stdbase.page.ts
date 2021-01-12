import { Component, OnInit } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { STDArgument } from 'src/app/entity/stdargument';
import { SocketService } from 'src/app/service/socket.service';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/service/data.service';
import { Observable } from 'rxjs';
import { ArgumentSubmissionStateDto } from 'src/app/dto/argument-submission-state-dto';
import { RatingSubmissionStateDto } from 'src/app/dto/rating-submission-state-dto';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-stdbase',
  templateUrl: './stdbase.page.html',
  styleUrls: ['./stdbase.page.scss'],
})
export class STDBasePage implements OnInit {
  private componentCount = 8;
  discussion: ShortTermDiscussion;
  roundArguments: STDArgument[];
  discussionArguments: Array<STDArgument[]>;
  randomArgument: STDArgument;
  activeComponent = new Array<boolean>(this.componentCount);
  username: string;
  isHost: boolean;
  argumentSubmissionState: Observable<ArgumentSubmissionStateDto>;
  ratingSubmissionState: Observable<RatingSubmissionStateDto>;

  constructor(private route: ActivatedRoute, private socket: SocketService, private auth: AuthService,
     private toastService: ToastService) { }

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
        console.log(username+ " joined the room.");
        this.discussion.users.push(username);
      } catch (error) {
        console.error("userJoined: Failed to parse incoming data: "+ error);
      }
    });

    this.socket.userLeft().subscribe(username => {
      try {
        console.log(username+ " left the room.");
        const index = this.discussion.users.indexOf(username);
        if (index != null) {
          this.discussion.users.splice(index, 1);
        }
        else {
          console.error("userLeft: User does not exist");
        }
      } catch (error) {
        console.error("userLeft: Failed to parse incoming data: "+ error);
      }
    });

    this.argumentSubmissionState = this.socket.getCurrentArgumentSubmission();
    this.ratingSubmissionState = this.socket.getCurrentArgumentsRated();

    this.socket.discussionStarts().subscribe(() => {
      this.resetActiveComponents();
      this.activateComponent(1);
    });

    this.socket.getRoundArguments().subscribe(args => {
      this.roundArguments = args;
      this.activateComponent(2);
    });

    this.socket.getRoundResult().subscribe(args => {
      console.log("Received Round result");
      this.roundArguments = args;
      this.activateComponent(3);
    });

    this.socket.nextRound().subscribe(arg => {
      this.randomArgument = arg;
      this.activateComponent(4);
    });

    this.socket.getRoundComments().subscribe(comments => {
      console.log(comments);
      this.roundArguments = comments;
      this.activateComponent(5);
    });

    this.socket.endOfDiscussion().subscribe(args => {
      this.socket.disconnect();
      // Deprecated
      // this.leaveRoom();
      // this.dataService.setData(this.discussion.discussionId, this.discussion);
      // this.navController.navigateRoot('/std/arguments/'+ this.discussion.discussionId, { replaceUrl: true });
      this.discussionArguments = args;
      this.activateComponent(6);
    }); 

    this.socket.error().subscribe(error => {
      this.toastService.presentToast(error);
    })

    // Deprecated
    // this.socket.getResultComments().subscribe(comments => {
    //   this.resultComments = comments;
    //   this.activateComponent(7);
    // })
  }

  leaveRoom() {
    this.socket.disconnect();

    // Deprecated
    // this.socket.leaveRoom(this.discussion.discussionId, this.username);
    // try {
    //   const res = this.http.leaveStd(this.discussion.discussionId, this.username);
    // } catch (error) {
    //   console.error("Failed to leave STD: "+ error.text);
    // }
  }

  onStart(event) {
    if (this.discussion.users.length == 1) {
      this.toastService.presentToast("Not enough discussants to start the discussion");
      return;
    }
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
    console.log("Waiting for others to finish writing argument.");
    //TODO: Loading bar/screen?
  }

  onRatingFinished(ratedArguments: STDArgument[]) {
    this.socket.submitArgumentRating(ratedArguments);
    console.log("rating submitted");
  }

  onCommentFinished(comment: string) {
    this.socket.sendComment(this.discussion.discussionId, this.username, comment, this.randomArgument.text);
    this.roundArguments = [];
  }

  onCommentRatingFinished(comments: STDArgument[]) {
    this.socket.submitArgumentRating(comments);
  }

  forceStartNextRound() {
    this.socket.forceStartNextRound(this.discussion.discussionId);
    this.roundArguments = [];
  }


}
