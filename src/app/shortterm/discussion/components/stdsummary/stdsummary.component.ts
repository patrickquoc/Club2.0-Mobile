import { Component, OnInit, Input } from '@angular/core';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdsummary',
  templateUrl: './stdsummary.component.html',
  styleUrls: ['./stdsummary.component.scss'],
})
export class STDSummaryComponent implements OnInit {
  @Input() allArguments: Array<STDArgument[]>;

  constructor() { }

  ngOnInit() {}

}
