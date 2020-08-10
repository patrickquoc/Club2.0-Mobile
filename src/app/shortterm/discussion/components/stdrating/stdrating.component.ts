import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { Argument } from 'src/app/entity/argument';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';

@Component({
  selector: 'app-stdrating',
  templateUrl: './stdrating.component.html',
  styleUrls: ['./stdrating.component.scss'],
})
export class STDRatingComponent implements OnInit {
  @Input() discussion: ShortTermDiscussion
  @Output() finished: EventEmitter<boolean>;
  arguments: Array<Argument>;
  private username: string;

  constructor(private socket: SocketService, private auth: AuthService , private http: HttpService) { }

  async ngOnInit() {
    this.username = await this.auth.getUsername();
    //TODO: Remove Mock data if STD works
    /*
    await this.http.getArgumentsById(0, 10, "5f19590159735428b07c9323", this.username)
    .then(a => {
      for (var i in a) {
        a[i].totalRating = new Array<number>(2);
      }
      this.arguments = a;
    });*/
    this.arguments = (await this.socket.getRoundArguments()) as Argument[];
  }

  onLike(argument: Argument) {
    argument.totalRating[0] == 0 ? argument.totalRating[0] = 1 : argument.totalRating[0] = 0;
    argument.totalRating[1] = 0;
  }

  onDislike(argument: Argument) {
    argument.totalRating[1] == 0 ? argument.totalRating[1] = 1 : argument.totalRating[1] = 0;
    argument.totalRating[0] = 0;
  }

  hasLiked(argument: Argument) {
    return argument.totalRating[0] == 1;
  }


  hasDisliked(argument: Argument) {
    return argument.totalRating[1] == 1;
  }

  onSubmitRating() {
    const res = this.socket.submitArgumentRating(this.discussion.discussionId, this.arguments);
    this.finished.emit(true);
  }
}
