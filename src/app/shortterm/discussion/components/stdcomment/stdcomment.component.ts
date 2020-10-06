import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdcomment',
  templateUrl: './stdcomment.component.html',
  styleUrls: ['./stdcomment.component.scss'],
})
export class STDCommentComponent implements OnInit {
  @Input() discussion: ShortTermDiscussion
  @Input() argument: STDArgument;
  @Output() comment = new EventEmitter<string>();
  input: string;

  constructor() { }

  ngOnInit() {}

  onSubmit() {
    if(this.input.length < 1) {
      console.log("No input")
    }
    else {
      this.comment.emit(this.input);
    }
  }
}
