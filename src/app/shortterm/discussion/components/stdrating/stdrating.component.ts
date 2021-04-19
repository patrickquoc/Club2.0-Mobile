import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';
import { Observable } from 'rxjs';
import { RatingSubmissionStateDto } from 'src/app/dto/rating-submission-state-dto';

@Component({
  selector: 'app-stdrating',
  templateUrl: './stdrating.component.html',
  styleUrls: ['./stdrating.component.scss'],
})
export class STDRatingComponent implements OnInit{
  @Input() roundArguments: STDArgument[];
  @Input() discussion: ShortTermDiscussion;
  @Input() user: string;
  @Input() ratingSubmissionState: Observable<RatingSubmissionStateDto>;
  @Input() blockNotification: string;  
  @Output() finished = new EventEmitter<STDArgument[]>();
  submissionState: RatingSubmissionStateDto;
  ratingSubmitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.ratingSubmissionState.subscribe(dto => {
      this.submissionState = dto;
    })
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
    this.ratingSubmitted = true;
  }
}
