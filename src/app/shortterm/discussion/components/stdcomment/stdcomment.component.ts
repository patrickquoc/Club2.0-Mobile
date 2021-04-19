import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ArgumentSubmissionStateDto } from 'src/app/dto/argument-submission-state-dto';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-stdcomment',
  templateUrl: './stdcomment.component.html',
  styleUrls: ['./stdcomment.component.scss'],
})
export class STDCommentComponent implements OnInit {
  @Input() discussion: ShortTermDiscussion
  @Input() argument: STDArgument;
  @Input() commentSubmissionState: Observable<ArgumentSubmissionStateDto>;
  @Input() blockNotification: string;  
  @Output() comment = new EventEmitter<string>();
  input: string;
  submissionState: ArgumentSubmissionStateDto;
  commentSubmitted: boolean = false;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.commentSubmissionState.subscribe(dto => {
      this.submissionState = dto;
    });
  }

  onSubmit() {
    if(this.input.length < 1) {
      this.toastService.presentToast("Please enter a comment")
    }
    else {
      this.commentSubmitted = true;
      this.comment.emit(this.input);
    }
  }
}
