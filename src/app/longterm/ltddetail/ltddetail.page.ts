import { Component, OnInit } from '@angular/core';
import { LongTermDiscussion } from 'src/app/entity/long-term-discussion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ltddetail',
  templateUrl: './ltddetail.page.html',
  styleUrls: ['./ltddetail.page.scss'],
})
export class LTDDetailPage implements OnInit {
  selectedDiscussion: LongTermDiscussion = {
    discussionId: 'wkwneer',
    host: 'Eva Rossmann',
    name: 'Was können wir noch essen?',
    description: 'Diskussion, wie wir uns noch gut und leistbar ernähren kommen, woher unser Essen stammt, welche Wege die Lebensmittel zurücklegen, bis sie bei uns am Tisch sind. ',
    categories : ['Food', 'Environment'],
    date: new Date(),
    archived: false
  }

  constructor() {
    
  }

  ngOnInit() {
  }

  //TODO: Routing Guard?

}
