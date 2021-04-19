import { Component, OnInit } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { STDArgument } from 'src/app/entity/stdargument';
import { SocketService } from 'src/app/service/socket.service';
import { Observable, Subscription } from 'rxjs';
import { ArgumentSubmissionStateDto } from 'src/app/dto/argument-submission-state-dto';
import { RatingSubmissionStateDto } from 'src/app/dto/rating-submission-state-dto';
import { ToastService } from 'src/app/service/toast.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-stdbase',
  templateUrl: './stdbase.page.html',
  styleUrls: ['./stdbase.page.scss'],
})
export class STDBasePage implements OnInit {
  private readonly componentCount = 8;
  activeComponent = new Array<boolean>(this.componentCount);
  discussion: ShortTermDiscussion;
  username: string;
  isHost: boolean;
  blockNotification: string = "";

  randomArgument: STDArgument;
  roundArguments: STDArgument[];
  discussionArguments: Array<STDArgument[]>; 

  argumentSubmissionState: Observable<ArgumentSubmissionStateDto>;
  ratingSubmissionState: Observable<RatingSubmissionStateDto>;

  backButtonSubscription: Subscription;

  constructor(private route: ActivatedRoute, private socket: SocketService, private auth: AuthService,
     private toastService: ToastService, private platfrom: Platform) { }

  //Call on opening the view
  ionViewDidEnter() {
    this.backButtonSubscription = this.platfrom.backButton.subscribeWithPriority(9999, () => {
      //Keeping this empty means that button won't react
    });
  }

  //Call on closing the view
  ionViewWillLeave() {
    //Unsubscribing otherwise backbutton will be disabled forever
    this.backButtonSubscription.unsubscribe();
  }
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
        this.toastService.presentToast(username+ " joined the room.");
        this.discussion.users.push(username);
      } catch (error) {
        console.error("userJoined: Failed to parse incoming data: "+ error);
      }
    });

    this.socket.userLeft().subscribe(username => {
      try {
        this.toastService.presentToast(username+ " left the room.");
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

    this.socket.getNotificationBlocked().subscribe(message => {
      this.toastService.presentToast(message);
      this.blockNotification = message;
    });

    this.socket.getNotificationContinues().subscribe(message => {
      this.toastService.presentToast(message);
      this.blockNotification = "";
    });

    this.socket.discussionStarts().subscribe(() => {
      this.resetActiveComponents();
      this.activateComponent(1);
    });

    this.socket.getRoundArguments().subscribe(args => {
      this.roundArguments = args;
      this.activateComponent(2);
    });

    this.socket.getRoundResult().subscribe(args => {
      this.roundArguments = args;
      this.activateComponent(3);
    });

    this.socket.nextRound().subscribe(arg => {
      this.randomArgument = arg;
      this.activateComponent(4);
    });

    this.socket.getRoundComments().subscribe(comments => {
      this.roundArguments = comments;
      this.activateComponent(5);
    });

    this.socket.endOfDiscussion().subscribe(args => {
      this.socket.disconnect();
      this.discussionArguments = args;
      this.activateComponent(6);
    }); 

    this.socket.error().subscribe(error => {
      this.toastService.presentToast(error);
    });
  }

  leaveRoom() {
    this.socket.disconnect();
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
  }

  onRatingFinished(ratedArguments: STDArgument[]) {
    this.socket.submitArgumentRating(ratedArguments);
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
