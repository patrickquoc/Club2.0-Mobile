import { Component, OnInit } from '@angular/core';
import { LongTermDiscussion } from 'src/app/entity/long-term-discussion';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ltdview',
  templateUrl: './ltdview.component.html',
  styleUrls: ['./ltdview.component.scss'],
})
export class LTDViewComponent implements OnInit {
  discussions = new Array<LongTermDiscussion>();
  private pageIndex = 0;
  searchString = '';

  constructor(private http: HttpService) {
    //TODO: Remove if Create LTD page exist
    /*
    http.createLtd({
      host: 'Eva Rossmann',
      name: 'Was können wir noch essen?',
      description: 'Diskussion, wie wir uns noch gut und leistbar ernähren kommen, woher unser Essen stammt, welche Wege die Lebensmittel zurücklegen, bis sie bei uns am Tisch sind. ',
      categories : ['Food', 'Environment'],
      date: new Date(),
    });

    http.createLtd({
      host: 'Horst Friedrich Mayer',
      name: 'Im Osten was Neues.',
      description: 'Diskussion um die oppositionelle Bürgerrechtsbewegung der Charta 77 in den sowjetisch dominierten Ländern Osteuropas. ',
      categories : ['History', 'Politics'],
      date: new Date(),
    });

    http.createLtd({
      host: 'Corinna Milborn',
      name: 'Atomkraft ja bitte?',
      description: 'Unmittelbarer Anlass der Diskussion war ein Störfall im Kernkraftwerk Krško in Slowenien bei dem es am 4. Juni 2008 zu einem Kühlmittelverluststörfall gekommen ist.  ',
      categories : ['Environment'],
      date: new Date(),
    });
*/
    /*
    this.discussions.push({
      discussionId: 'wkwneer',
      host: 'Eva Rossmann',
      name: 'Was können wir noch essen?',
      description: 'Diskussion, wie wir uns noch gut und leistbar ernähren kommen, woher unser Essen stammt, welche Wege die Lebensmittel zurücklegen, bis sie bei uns am Tisch sind. ',
      categories : ['Food', 'Environment'],
      date: new Date(),
      archived: false
    });

    this.discussions.push({
      discussionId: 'hfmiown',
      host: 'Horst Friedrich Mayer',
      name: 'Im Osten was Neues.',
      description: 'Diskussion um die oppositionelle Bürgerrechtsbewegung der Charta 77 in den sowjetisch dominierten Ländern Osteuropas. ',
      categories : ['History', 'Politics'],
      date: new Date(),
      archived: true
    });

    this.discussions.push({
      discussionId: 'cnajb',
      host: 'Corinna Milborn',
      name: 'Atomkraft ja bitte?',
      description: 'Unmittelbarer Anlass der Diskussion war ein Störfall im Kernkraftwerk Krško in Slowenien bei dem es am 4. Juni 2008 zu einem Kühlmittelverluststörfall gekommen ist.  ',
      categories : ['Environment'],
      date: new Date(),
      archived: true
    });
    */

    this.getNextDiscussions();
  }

  ngOnInit() {}


  loadLTDs(event): void {
    //TODO: Loading simulation. Remove if server connection is established
    setTimeout(() => {
      this.getNextDiscussions();
      event.target.complete();
    }, 500);
    
  }

  async getNextDiscussions() {
    //TODO: Replace with http request
    console.log("load new ltds")
    this.discussions = this.discussions.concat(await this.http.getLtdsPaged(this.pageIndex, 10));
    this.pageIndex++;
  }

  getCategoriesToString(ltd: LongTermDiscussion): string {
    let result = '';
    ltd.categories.forEach(cat => {
      result = result + cat + ', ';
    });
    result = result.slice(0, result.length - 2)
    return result;
  }

  getDiscussionsByCategory() {
    console.log(this.searchString);
  }
}
