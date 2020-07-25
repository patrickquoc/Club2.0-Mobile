import { Component, OnInit } from '@angular/core';
import { LongTermDiscussion } from 'src/app/entity/long-term-discussion';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { Argument } from 'src/app/entity/argument';
import { AuthService } from 'src/app/service/auth.service';

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

  arguments: Argument[];
  private pageIndex = 0;
  private fetchSize = 5;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpService, private auth: AuthService) { }

  async ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.selectedDiscussion = this.route.snapshot.data['special'];
    }
    this.arguments = await this.http.getArgumentsById(this.pageIndex, this.fetchSize,
       this.selectedDiscussion.discussionId, await this.auth.getUsername());

  }
  //TODO: Routing Guard?

}
