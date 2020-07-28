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
    //TODO: Replace with http request
    console.log("load new ltds")
    this.discussions = this.discussions.concat(await this.http.getStdsPaged(this.pageIndex, this.fetchSize));
    this.pageIndex++;
  }

  getCategoriesToString(ltd: ShortTermDiscussion): string {
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

  openDetailPage(ltd: ShortTermDiscussion) {
    this.dataService.setData(0, ltd);
    this.router.navigateByUrl('/view/ltd/0');
  }

  async reloadDiscussion() {
    this.pageIndex = 0;
    this.discussions = await this.http.getStdsPaged(this.pageIndex, this.fetchSize);
  }
}
