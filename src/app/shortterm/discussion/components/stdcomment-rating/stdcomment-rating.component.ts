import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdcomment-rating',
  templateUrl: './stdcomment-rating.component.html',
  styleUrls: ['./stdcomment-rating.component.scss'],
})
export class STDCommentRatingComponent {
  @Input() roundComments: STDArgument[];
  @Input() discussion: ShortTermDiscussion;
  @Input() user: string;
  @Output() finished = new EventEmitter<STDArgument[]>();

  constructor() { }

  onLike(comment: STDArgument) {
    comment.rating[0] == 0 ? comment.rating[0] = 1 : comment.rating[0] = 0;
    comment.rating[1] = 0;
  }

  onDislike(comment: STDArgument) {
    comment.rating[1] == 0 ? comment.rating[1] = 1 : comment.rating[1] = 0;
    comment.rating[0] = 0;
  }

  hasLiked(comment: STDArgument) {
    return comment.rating[0] == 1;
  }


  hasDisliked(comment: STDArgument) {
    return comment.rating[1] == 1;
  }

  onSubmitRating() {
    this.finished.emit(this.roundComments);
  }

}
