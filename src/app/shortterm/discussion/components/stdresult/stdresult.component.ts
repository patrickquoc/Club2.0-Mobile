import { Component, OnInit, Input } from '@angular/core';
import { STDArgument } from 'src/app/entity/stdargument';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';

@Component({
  selector: 'app-stdresult',
  templateUrl: './stdresult.component.html',
  styleUrls: ['./stdresult.component.scss'],
})
export class STDResultComponent implements OnInit {
  @Input() arguments: STDArgument[];
  @Input() isHost: boolean;
  
  constructor() { }

  ngOnInit() {}

}
