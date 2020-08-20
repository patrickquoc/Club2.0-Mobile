import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';

@Component({
  selector: 'app-stdargument-creator',
  templateUrl: './stdargument-creator.component.html',
  styleUrls: ['./stdargument-creator.component.scss'],
})
export class STDArgumentCreatorComponent implements OnInit {
  @Input() discussion: ShortTermDiscussion;  
  @Output() finished = new EventEmitter<string>();
  argument: string;

  constructor() { }

  ngOnInit() {}

  onSubmit() {
    if(this.argument.length == 0) {
      //TODO: Toast or Validator
      console.log("Argument text is empty!");
    }
    else {
      this.finished.emit(this.argument);
    }
  }
}
