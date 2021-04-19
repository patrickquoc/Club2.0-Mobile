import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdresult',
  templateUrl: './stdresult.component.html',
  styleUrls: ['./stdresult.component.scss'],
})
export class STDResultComponent implements OnInit {
  @Input() arguments: STDArgument[];
  @Input() isHost: boolean;
  @Input() blockNotification: string;  
  @Output() nextRound = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  forceStartNextRound() {
    this.nextRound.emit();
  }
}
