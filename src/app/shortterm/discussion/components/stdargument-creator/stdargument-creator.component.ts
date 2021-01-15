import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ArgumentSubmissionStateDto } from 'src/app/dto/argument-submission-state-dto';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-stdargument-creator',
  templateUrl: './stdargument-creator.component.html',
  styleUrls: ['./stdargument-creator.component.scss'],
})
export class STDArgumentCreatorComponent implements OnInit {
  @Input() discussion: ShortTermDiscussion;
  @Input() argumentSubmissionState: Observable<ArgumentSubmissionStateDto>;
  @Input() isBlocked: boolean;  
  @Output() finished = new EventEmitter<string>();
  submissionState: ArgumentSubmissionStateDto;
  argumentSubmitted: boolean = false;
  argument: string;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.argumentSubmissionState.subscribe(dto => {
      this.submissionState = dto;
    })
  }

  onSubmit() {
    if(this.argument.length == 0) {
      this.toastService.presentToast("Please enter an argument");
    }
    else {
      this.finished.emit(this.argument);
      this.argumentSubmitted = true;
    }
  }
}
