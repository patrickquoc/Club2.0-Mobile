import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { DataService } from 'src/app/service/data.service';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { AlertController, NavController } from '@ionic/angular';

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

  constructor(private http: HttpService, private dataService: DataService, private navController: NavController,
    private alertController: AlertController) {
    this.getNextDiscussions();
  }

  ngOnInit() {}


  async loadSTDs(event): Promise<void> {
    const res = await this.getNextDiscussions();
    if (res == true) {
      event.target.complete();
    } else  {
      event.target.cancel();
    }
  }

  async getNextDiscussions(): Promise<boolean> {
    if(this.isFilteredByCategory) {
      const search = this.searchString.split(',');
      try {
        this.discussions = this.discussions.concat(
          await this.http.getStdsByCategory(this.pageIndex, this.fetchSize, search)
        );
      } catch (error) {
        return false;
      }
    }
    else {
      try {
        this.discussions = this.discussions.concat(await this.http.getStdsPaged(this.pageIndex, this.fetchSize));
      } catch (error) {
        return false;
      }
    }
    this.pageIndex++;
    return true;
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
    this.dataService.setData(std.discussionId, std);
    this.navController.navigateForward('/view/std/'+ std.discussionId);
  }

  async reloadDiscussion(): Promise<boolean> {
    this.pageIndex = 0;
    try {
      this.discussions = await this.http.getStdsPaged(this.pageIndex, this.fetchSize);
    } catch (error) {
      return false;
    }
    return true;
  }

  async getDiscussionsByCategory() {
    this.pageIndex = 0;
    const search = this.searchString.split(',');
    this.discussions = await this.http.getStdsByCategory(this.pageIndex, this.fetchSize, search);  
  }

  async getDiscussionsByName() {
    this.discussions = await this.http.getStdsByName(this.searchString);
  }

  async openFilterOptions() {
    const alert = await this.alertController.create({
      header: 'Search options',
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
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: (data: string) => {
            this.resetFilter();

            switch(data) {
              case '0': {
                this.isFilteredByName = true;
                break;
              }
              case '1': {
                this.isFilteredByCategory = true;         
                break;
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  resetFilter() {
    this.isFilteredByCategory = false;
    this.isFilteredByName = false;
  }

  async getFilteredDiscussion() {
    if (this.searchString == '') {
      await this.reloadDiscussion();
    }
    else if(this.isFilteredByCategory) {
      await this.getDiscussionsByCategory();
    }
    else {
      this.isFilteredByName = true;
      await this.getDiscussionsByName();
    }
  }

  openCreationPage() {
    this.navController.navigateForward("/create/std")
  }

  async refreshDiscussions(event) {
    const res = await this.reloadDiscussion();
    if (res == true) {
      event.target.complete();
    }
  }
}
