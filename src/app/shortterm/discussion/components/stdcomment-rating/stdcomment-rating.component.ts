import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingSubmissionStateDto } from 'src/app/dto/rating-submission-state-dto';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdcomment-rating',
  templateUrl: './stdcomment-rating.component.html',
  styleUrls: ['./stdcomment-rating.component.scss'],
})
export class STDCommentRatingComponent implements OnInit {
  @Input() roundComments: STDArgument[];
  @Input() discussion: ShortTermDiscussion;
  @Input() user: string;
  @Input() ratingSubmissionState: Observable<RatingSubmissionStateDto>;
  @Input() blockNotification: string;  
  @Output() finished = new EventEmitter<STDArgument[]>();
  ratingSubmitted: boolean = false;
  submissionState: RatingSubmissionStateDto;

  constructor() { }

  ngOnInit(): void {
    this.ratingSubmissionState.subscribe(dto => {
      this.submissionState = dto;
    })
  }

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
    this.ratingSubmitted = true;
  }
}
