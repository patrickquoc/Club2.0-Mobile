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
  private isFiltered = false;

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
    if(this.isFiltered) {
      const search = this.searchString.split(',');
      this.discussions = this.discussions.concat(
        await this.http.getLtdsByCategory(this.pageIndex, this.fetchSize, search)
      );
    }
    else {
      this.discussions = this.discussions.concat(await this.http.getLtdsPaged(this.pageIndex, this.fetchSize));
    }

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

  async getDiscussionsByCategory() {
    //TODO: Filter button
    console.log(this.searchString);
    if (this.searchString == '') {
      await this.reloadDiscussion();
    }
    else {
      this.isFiltered = true;
      this.pageIndex = 0;
      const search = this.searchString.split(',');
      this.discussions = await this.http.getLtdsByCategory(this.pageIndex, this.fetchSize, search);
      console.log(this.discussions);
    }
  }

  async getDiscussionsByName() {
    if (this.searchString == '') {
      await this.reloadDiscussion();
    }
    else {
      console.log(this.searchString);
      this.discussions = await this.http.getLtdsByName(this.searchString);
    }
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
