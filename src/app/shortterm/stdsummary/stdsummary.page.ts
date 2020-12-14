import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-stdsummary',
  templateUrl: './stdsummary.page.html',
  styleUrls: ['./stdsummary.page.scss'],
})
export class STDSummaryPage implements OnInit {
  public discussion: ShortTermDiscussion;
  public allArguments: Array<STDArgument[]> = new Array<STDArgument[]>();
  openLists: Array<boolean>;

  constructor(private route: ActivatedRoute, private http: HttpService, private navController: NavController) { }

  async ngOnInit() {
    this.allArguments.push(new Array<STDArgument>());
    this.allArguments.push(new Array<STDArgument>());

    this.openLists = new Array<boolean>(this.allArguments.length);

    if(this.route.snapshot.data['special']) {
      this.discussion = this.route.snapshot.data['special'];

      // this.allArguments = await this.http.getStdArguments(this.discussion.discussionId);

      const res = await this.http.getStdArguments(this.discussion.discussionId);
      res.forEach(argument => {
        console.log(argument);
        if (argument.prevArgumentText == null) {
          this.allArguments[0].push(argument);
        }
        else {
          this.allArguments[1].push(argument);
        }
      });
    }

  }

  back() {
    this.navController.navigateBack('stdhistory', { replaceUrl: true });
  }

  toggleSelection(index: number) {
    this.openLists[index] = ! this.openLists[index];
  }
}
