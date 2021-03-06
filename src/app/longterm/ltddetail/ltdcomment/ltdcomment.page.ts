import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CreateCommentDto } from 'src/app/dto/create-comment-dto';
import { RatingDto } from 'src/app/dto/rating-dto';
import { Argument } from 'src/app/entity/argument';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-ltdcomment',
  templateUrl: './ltdcomment.page.html',
  styleUrls: ['./ltdcomment.page.scss'],
})
export class LTDCommentPage implements OnInit {
  selectedComment: Argument;
  comments: Argument[] = [];
  constructor(private http: HttpService, private auth: AuthService, private alertController: AlertController,
    private route: ActivatedRoute, private dataService: DataService,
    private navController: NavController) { }

  async ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.selectedComment = this.route.snapshot.data['special'];
    }
    this.comments = await this.http.getComments(this.selectedComment.argumentId, await this.auth.getUsername());
  }

  async onLike(comment: Argument) {
    if(comment.userRating > 0) {
      comment.userRating = 0; 
    }
    else {
      comment.userRating = 1;
    }

    await this.sendCommentRating(comment);
  }

  async onDislike(comment: Argument) {
    if(comment.userRating < 0) {
      comment.userRating = 0;
    }
    else {
      comment.userRating = -1;
    }
    await this.sendCommentRating(comment);
  }

  async showCommentCreator() {
    const alert = this.alertController.create({
      header: 'Write Comment',
      inputs: [
        {
          name: 'comment',
          placeholder: 'Your comment',
          type: "textarea"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: async (data) => {
            const comment: CreateCommentDto = {
              prevArgumentId: this.selectedComment.argumentId,
              user: await this.auth.getUsername(),
              text: data.comment,
              date: new Date()
            };

            const res = await this.http.sendComment(comment);
            this.comments.push(res);    
            
          }
        }
      ]
    });
    (await alert).present();
  }

  async sendCommentRating(comment: Argument) {
    const rating: RatingDto = {
      argumentId: comment.argumentId,
      username: await this.auth.getUsername(),
      rating: comment.userRating
    }

    const res = await this.http.sendRating(rating) as Argument;
    const temp = this.comments.find(a => a.argumentId == res.argumentId);     // Find rated argument
    const index = this.comments.indexOf(temp);                                // Get index of rated argument
    this.comments[index] = res;                                               // Replace rated argument with updated argument
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
