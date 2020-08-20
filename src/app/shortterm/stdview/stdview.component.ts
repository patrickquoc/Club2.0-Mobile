import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { AlertController } from '@ionic/angular';

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
  private isFilteredByName = true;
  private isFilteredByCategory = false;
  private isFilteredByUser = false;

  constructor(private http: HttpService, private dataService: DataService, private router: Router,
    private alertController: AlertController) {
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
    if(this.isFilteredByCategory) {
      const search = this.searchString.split(',');
      this.discussions = this.discussions.concat(
        await this.http.getStdsByCategory(this.pageIndex, this.fetchSize, search)
      );
    }
    else {
      this.discussions = this.discussions.concat(await this.http.getStdsPaged(this.pageIndex, this.fetchSize));
    }

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
    this.pageIndex = 0;
    const search = this.searchString.split(',');
    this.discussions = await this.http.getStdsByCategory(this.pageIndex, this.fetchSize, search);
    console.log(this.discussions);
  
  }

  async getDiscussionsByName() {
    this.discussions = await this.http.getStdsByName(this.searchString);
  }

  async openFilterOptions() {
    const alert = await this.alertController.create({
      header: 'Filter by',
      inputs: [
        {
          name: 'byName',
          type: 'radio',
          label: 'Name',
          value: '0',
          checked: this.isFilteredByName
        },
        {
          name: 'byCategory',
          type: 'radio',
          label: 'Category',
          value: '1',
          checked: this.isFilteredByCategory
        },
        {
          name: 'byUser',
          type: 'radio',
          label: 'User',
          value: '2',
          checked: this.isFilteredByUser
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data: string) => {
            this.resetFilter();

            switch(data) {
              case '0': {
                this.isFilteredByName = true;
                console.log("Filtering by Name");
                break;
              }
              case '1': {
                this.isFilteredByCategory = true;                
                console.log("Filtering by Category");
                break;
              }
              case '2': {
                this.isFilteredByUser = true;
                console.log("Filtering by User");
                break;
              }
            }

            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  resetFilter() {
    this.isFilteredByCategory = false;
    this.isFilteredByName = false;
    this.isFilteredByUser = false;
  }

  async getFilteredDiscussion() {
    if (this.searchString == '') {
      await this.reloadDiscussion();
    }
    else if(this.isFilteredByCategory) {
      await this.getDiscussionsByCategory();
    }
    else if (this.isFilteredByUser) {
      await this.getDiscussionsByName();
    }
    else {
      this.isFilteredByName = true;
      await this.getDiscussionsByName();
    }
  }
}
