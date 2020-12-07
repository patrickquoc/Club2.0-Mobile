import { Component, OnInit } from '@angular/core';
import { LongTermDiscussion } from 'src/app/entity/long-term-discussion';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { Argument } from 'src/app/entity/argument';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { CreateArgumentDto } from 'src/app/dto/create-argument-dto';
import { RatingDto } from 'src/app/dto/rating-dto';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-ltddetail',
  templateUrl: './ltddetail.page.html',
  styleUrls: ['./ltddetail.page.scss'],
})
export class LTDDetailPage implements OnInit {
  selectedDiscussion: LongTermDiscussion;

  arguments: Array<Argument> = new Array<Argument>();
  private pageIndex = 1;
  private fetchSize = 5;

  constructor(private route: ActivatedRoute, private http: HttpService, private auth: AuthService, 
    private alertController: AlertController, private toastController: ToastController, private navController: NavController,
    private dataService: DataService) { }

  async ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.selectedDiscussion = this.route.snapshot.data['special'];
    }
    this.arguments = await this.http.getArgumentsById(0, this.fetchSize,
       this.selectedDiscussion.discussionId, await this.auth.getUsername());
  }
  
  async showArgumentCreator() {
    //TODO: Max character count (approx. 2000)
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

            const res = await this.http.sendArgument(argument);
            console.log(res);
            this.arguments.push(res);
          
          }
        }
      ]
    });
    (await alert).present();
  }

  getFormattedDate(date: Date): string {
    return date.toString();
  }

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

  async onLike(argument: Argument) {
    if(argument.userRating > 0) {
      argument.userRating = 0; 
    }
    else {
      argument.userRating = 1;
    }

    await this.sendArgumentRating(argument);
  }

  async onDislike(argument: Argument) {
    if(argument.userRating < 0) {
      argument.userRating = 0;
    }
    else {
      argument.userRating = -1;
    }
    await this.sendArgumentRating(argument);
  }

  async sendArgumentRating(argument: Argument) {
    const rating: RatingDto = {
      argumentId: argument.argumentId,
      username: await this.auth.getUsername(),
      rating: argument.userRating
    }

    //Update Argument rating
    const res = await this.http.sendRating(rating) as Argument;
    const temp = this.arguments.find(a => a.argumentId == res.argumentId);
    const index = this.arguments.indexOf(temp);
    this.arguments[index] = res;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  getPositiveRatingColor(argument: Argument): string{
    return argument.userRating == 1 ? 'primary' : 'medium';
  }

  getNegativeRatingColor(argument: Argument): string{
    return argument.userRating == -1 ? 'danger' : 'medium';
  }

  routeToComments(argument: Argument) {
    this.dataService.setData(argument.argumentId, argument);
    this.navController.navigateForward('/view/ltd/comments/'+ argument.argumentId);
  }
} 
