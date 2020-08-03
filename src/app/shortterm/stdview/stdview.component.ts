import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';

@Component({
  selector: 'app-stdview',
  templateUrl: './stdview.component.html',
  styleUrls: ['./stdview.component.scss'],
})
export class STDViewComponent implements OnInit {
  discussions = new Array<ShortTermDiscussion>();
  private pageIndex = 0;
  private fetchSize = 15;
  searchString = '';
  private isFiltered = false;

  constructor(private http: HttpService, private dataService: DataService, private router: Router) {
    this.getNextDiscussions();
  }

  ngOnInit() {}


  loadSTDs(event): void {
    //TODO: Loading simulation. Remove if server connection is established
    setTimeout(() => {
      this.getNextDiscussions();
      event.target.complete();
    }, 500);
    
  }

  async getNextDiscussions() {
    console.log("load new ltds")
    this.discussions = this.discussions.concat(await this.http.getStdsPaged(this.pageIndex, this.fetchSize));
    this.pageIndex++;
  }

  getCategoriesToString(std: ShortTermDiscussion): string {
    let result = '';
    std.categories.forEach(cat => {
      result = result + cat + ', ';
    });
    result = result.slice(0, result.length - 2)
    return result;
  }

  openDetailPage(std: ShortTermDiscussion) {
    this.dataService.setData(1, std);
    this.router.navigateByUrl('/view/std/1');
  }

  async reloadDiscussion() {
    this.pageIndex = 0;
    this.discussions = await this.http.getStdsPaged(this.pageIndex, this.fetchSize);
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
      this.discussions = await this.http.getStdsByCategory(this.pageIndex, this.fetchSize, search);
      console.log(this.discussions);
    }
  }

  async getDiscussionsByName() {
    if (this.searchString == '') {
      await this.reloadDiscussion();
    }
    else {
      console.log(this.searchString);
      this.discussions = await this.http.getStdsByName(this.searchString);
    }
  }
}
