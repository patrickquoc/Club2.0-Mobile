import { Component, OnInit } from '@angular/core';
import { LongTermDiscussion } from 'src/app/entity/long-term-discussion';
import { HttpService } from 'src/app/service/http.service';
import { DataService } from 'src/app/service/data.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

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
  private isFilteredByName = true;
  private isFilteredByCategory = false;

  constructor(private http: HttpService, private dataService: DataService, private navController: NavController,
    private alertController: AlertController, private auth: AuthService) {
    this.getNextDiscussions();
  }

  ngOnInit() {}

  async loadLTDs(event): Promise<void> {
    const res = await this.getNextDiscussions();
    if (res == true) {
      event.target.complete();
    }
  }

  async getNextDiscussions(): Promise<boolean> {
    if(this.isFilteredByCategory) {
      const search = this.searchString.split(',');
      try {
        this.discussions = this.discussions.concat(
          await this.http.getLtdsByCategory(this.pageIndex, this.fetchSize, search)
        );
      } catch (error) {
        return false;
      }
    }
    else {
      try {
        this.discussions = this.discussions.concat(await this.http.getLtdsPaged(this.pageIndex, this.fetchSize));
      } catch (error) {
        return false;
      }
    }

    this.pageIndex++;
    return true;
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
    this.pageIndex = 0;
    const search = this.searchString.split(',');

    this.discussions = await this.http.getLtdsByCategory(this.pageIndex, this.fetchSize, search);
    
  }

  async getDiscussionsByName() {
    this.discussions = await this.http.getLtdsByName(this.searchString);
  }

  async openDetailPage(ltd: LongTermDiscussion) {
    this.dataService.setData(ltd.discussionId, ltd);
    this.navController.navigateForward('/view/ltd/'+ ltd.discussionId);
  }

  async reloadDiscussion(): Promise<boolean> {
    this.pageIndex = 0;
    try {
      this.discussions = await this.http.getLtdsPaged(this.pageIndex, this.fetchSize);
    } catch (error) {
      return false;
    }
    return true;
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

  async refreshDiscussions(event) {
    const res = await this.reloadDiscussion();
    if (res == true) {
      event.target.complete();
    }
  }
}
