import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { Argument } from 'src/app/entity/argument';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ArgumentSubmissionStateDto } from 'src/app/dto/argument-submission-state-dto';
import { RatingSubmissionStateDto } from 'src/app/dto/rating-submission-state-dto';
import { ToastService } from 'src/app/service/toast.service';

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
  @Output() finished = new EventEmitter<STDArgument[]>();
  submissionState: RatingSubmissionStateDto;
  ratingSubmitted: boolean = false;

  constructor(private toastService: ToastService) { }

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
    this.toastService.presentToast("Rating submitted. Please wait for the others to finish.");
  }
}
