import { Component, OnInit } from '@angular/core';
import { LongTermDiscussion } from 'src/app/entity/long-term-discussion';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { Argument } from 'src/app/entity/argument';
import { AuthService } from 'src/app/service/auth.service';
import { ModalController } from '@ionic/angular';
import { LTDArgumentCreatorComponent } from './ltdargument-creator/ltdargument-creator.component';

@Component({
  selector: 'app-ltddetail',
  templateUrl: './ltddetail.page.html',
  styleUrls: ['./ltddetail.page.scss'],
})
export class LTDDetailPage implements OnInit {
  selectedDiscussion: LongTermDiscussion;

  arguments: Argument[];
  private argumentModal = null;
  private pageIndex = 1;
  private fetchSize = 5;

    //TODO: Routing Guard?
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpService, private auth: AuthService, 
    private modalController: ModalController) { }

  async ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.selectedDiscussion = this.route.snapshot.data['special'];
    }
    this.arguments = await this.http.getArgumentsById(0, this.fetchSize,
       this.selectedDiscussion.discussionId, await this.auth.getUsername());

  }
  
  async showArgumentCreator() {
    const modal = await this.modalController.create({
      component: LTDArgumentCreatorComponent,
      componentProps: {
        discussionId: this.selectedDiscussion.discussionId
      },

    });
    let argumentText: string;
    modal.onWillDismiss().then(returnedData => {
      argumentText = returnedData.data
      console.log(argumentText);
    });
    return await modal.present();
  }

  getFormattedDate(date: Date): string {
    return date.toString();
  }

  //TODO: Infinite Scroll Fetch
  loadArguments(event) {

  }
} 
