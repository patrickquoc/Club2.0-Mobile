import { Component, OnInit } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stdbase',
  templateUrl: './stdbase.page.html',
  styleUrls: ['./stdbase.page.scss'],
})
export class STDBasePage implements OnInit {
  discussion: ShortTermDiscussion;
  activeComponent = new Array<boolean>(4);
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.discussion = this.route.snapshot.data['special'];
    }
    this.activeComponent[0] = true;
  }
}
