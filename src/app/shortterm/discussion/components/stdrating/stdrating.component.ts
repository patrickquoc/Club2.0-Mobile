import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class STDRatingComponent{
  @Input() roundArguments: STDArgument[];
  @Output() finished = new EventEmitter<STDArgument[]>();

  constructor() { }

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
