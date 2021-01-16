import { Component, Input, OnInit } from '@angular/core';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdcomment-result',
  templateUrl: './stdcomment-result.component.html',
  styleUrls: ['./stdcomment-result.component.scss'],
})

// Deprecated: Component currently not in use 
export class STDCommentResultComponent implements OnInit {
  @Input() comments: STDArgument[][];
  @Input() isHost: boolean;

  constructor() { }

  ngOnInit() {}

}
