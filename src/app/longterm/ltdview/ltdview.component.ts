import { Component, OnInit } from '@angular/core';
import { LongTermDiscussion } from 'src/app/entity/long-term-discussion';
import { HttpService } from 'src/app/service/http.service';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-ltdview',
  templateUrl: './ltdview.component.html',
  styleUrls: ['./ltdview.component.scss'],
})
export class LTDViewComponent implements OnInit {
  discussions = new Array<LongTermDiscussion>();
  private pageIndex = 0;
  private fetchSize = 15;
  searchString = '';

  constructor(private http: HttpService, private dataService: DataService, private router: Router) {
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
    this.discussions = this.discussions.concat(await this.http.getLtdsPaged(this.pageIndex, this.fetchSize));
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

  openDetailPage(ltd: LongTermDiscussion) {
    this.dataService.setData(0, ltd);
    this.router.navigateByUrl('/view/ltd/0');
  }

  async reloadDiscussion() {
    this.pageIndex = 0;
    this.discussions = await this.http.getLtdsPaged(this.pageIndex, this.fetchSize);
  }
}
