import { Component, OnInit } from '@angular/core';
import { LongTermDiscussion } from 'src/app/entity/long-term-discussion';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { Argument } from 'src/app/entity/argument';
import { AuthService } from 'src/app/service/auth.service';
import { ModalController, AlertController } from '@ionic/angular';
import { CreateArgumentDto } from 'src/app/dto/create-argument-dto';

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
    private modalController: ModalController, private alertController: AlertController) { }

  async ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.selectedDiscussion = this.route.snapshot.data['special'];
    }
    this.arguments = await this.http.getArgumentsById(0, this.fetchSize,
       this.selectedDiscussion.discussionId, await this.auth.getUsername());

  }
  
  async showArgumentCreator() {
    /*
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
    return await modal.present();*/
    const alert = this.alertController.create({
      header: 'Write Argument',
      inputs: [
        {
          name: 'argument',
          placeholder: 'Your argument',
          type: "textarea"
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
          handler: async (data) => {
            const argument: CreateArgumentDto = {
              discussionId: this.selectedDiscussion.discussionId,
              user: await this.auth.getUsername(),
              text: data.argument,
              date: new Date()
            }
            console.log(argument);
            const res = await this.http.sendArgument(argument);
            console.log(res)
          }
        }
      ]
    });
    (await alert).present();
  }

  getFormattedDate(date: Date): string {
    return date.toString();
  }

  //TODO: Infinite Scroll Fetch
  async loadArguments(event) {
    setTimeout(() => {
      this.getArgumentsPaged();
      event.target.complete();
    }, 500);
  
  }

  async getArgumentsPaged() {
    this.arguments = this.arguments.concat(
      await this.http.getArgumentsById(this.pageIndex, this.fetchSize,
        this.selectedDiscussion.discussionId, await this.auth.getUsername()
      )
    );

    this.pageIndex++;
  }
} 
