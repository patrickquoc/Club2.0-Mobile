import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { Argument } from 'src/app/entity/argument';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdrating',
  templateUrl: './stdrating.component.html',
  styleUrls: ['./stdrating.component.scss'],
})
export class STDRatingComponent implements OnInit {
  @Input() discussion: ShortTermDiscussion
  @Output() finished = new EventEmitter<STDArgument[]>();
  arguments: Array<Argument>;

  constructor() { }
  @Input() roundArguments: STDArgument[];

  ngOnInit() {
    //this.username = await this.auth.getUsername();
    //TODO: Remove Mock data if STD works
    /*
    await this.http.getArgumentsById(0, 10, "5f19590159735428b07c9323", this.username)
    .then(a => {
      for (var i in a) {
        a[i].totalRating = new Array<number>(2);
      }
      this.arguments = a;
    });*/
  }

  onLike(argument: STDArgument) {
    argument.rating[0] == 0 ? argument.rating[0] = 1 : argument.rating[0] = 0;
    argument.rating[1] = 0;
  }

  onDislike(argument: STDArgument) {
    argument.rating[1] == 0 ? argument.rating[1] = 1 : argument.rating[1] = 0;
    argument.rating[0] = 0;
  }

  hasLiked(argument: STDArgument) {
    return argument.rating[0] == 1;
  }


  hasDisliked(argument: STDArgument) {
    return argument.rating[1] == 1;
  }

  onSubmitRating() {
    this.finished.emit(this.roundArguments);
  }
}
