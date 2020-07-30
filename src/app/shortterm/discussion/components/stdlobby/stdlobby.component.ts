import { Component, OnInit, Input } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';

@Component({
  selector: 'app-stdlobby',
  templateUrl: './stdlobby.component.html',
  styleUrls: ['./stdlobby.component.scss'],
})
export class STDLobbyComponent implements OnInit {
  @Input()
  discussion: ShortTermDiscussion;
  constructor() { }

  ngOnInit() {}

}
