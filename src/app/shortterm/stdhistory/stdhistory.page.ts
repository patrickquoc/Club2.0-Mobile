import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-stdhistory',
  templateUrl: './stdhistory.page.html',
  styleUrls: ['./stdhistory.page.scss'],
})
export class STDHistoryPage implements OnInit {
  public discussions: ShortTermDiscussion[] = [];

  constructor(private http: HttpService, private navController: NavController, private dataService: DataService) { 
    this.getDiscussions();
  }

  ngOnInit() {
  }

  async getDiscussions() {
    this.discussions = await this.http.getStdHistoryFromUser();
  }

  back() {
    this.navController.navigateBack('home');
  }

  openDetailPage(std: ShortTermDiscussion) {
    this.dataService.setData(std.discussionId, std);
    this.navController.navigateForward('/stdhistory/summary/'+ std.discussionId);
  }

  getCategoriesToString(std: ShortTermDiscussion) {
    let result = '';
    std.categories.forEach(cat => {
      result = result + cat + ', ';
    });
    result = result.slice(0, result.length - 2)
    return result;
  }
}
