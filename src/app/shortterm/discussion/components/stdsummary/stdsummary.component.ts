import { Component, OnInit, Input } from '@angular/core';
import { STDArgument } from 'src/app/entity/stdargument';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';

@Component({
  selector: 'app-stdsummary',
  templateUrl: './stdsummary.component.html',
  styleUrls: ['./stdsummary.component.scss'],
})
export class STDSummaryComponent implements OnInit {
  @Input() allArguments: Array<STDArgument[]>;
  @Input() discussion: ShortTermDiscussion;
  constructor() { }

  ngOnInit() {}

}
