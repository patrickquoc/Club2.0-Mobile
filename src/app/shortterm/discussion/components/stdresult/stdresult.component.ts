import { Component, OnInit, Input } from '@angular/core';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdresult',
  templateUrl: './stdresult.component.html',
  styleUrls: ['./stdresult.component.scss'],
})
export class STDResultComponent implements OnInit {
  @Input() arguments: STDArgument[];
  constructor() { }

  ngOnInit() {}

}
