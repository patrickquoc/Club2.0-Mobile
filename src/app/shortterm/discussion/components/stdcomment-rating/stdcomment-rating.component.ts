import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdcomment-rating',
  templateUrl: './stdcomment-rating.component.html',
  styleUrls: ['./stdcomment-rating.component.scss'],
})
export class STDCommentRatingComponent {
  @Input() roundComments: STDArgument[];
  @Input() discussion: ShortTermDiscussion;
  @Input() user: string;
  @Output() finished = new EventEmitter<STDArgument[]>();

  constructor(private toastController: ToastController) { }

  onLike(comment: STDArgument) {
    comment.rating[0] == 0 ? comment.rating[0] = 1 : comment.rating[0] = 0;
    comment.rating[1] = 0;
  }

  onDislike(comment: STDArgument) {
    comment.rating[1] == 0 ? comment.rating[1] = 1 : comment.rating[1] = 0;
    comment.rating[0] = 0;
  }

  hasLiked(comment: STDArgument) {
    return comment.rating[0] == 1;
  }


  hasDisliked(comment: STDArgument) {
    return comment.rating[1] == 1;
  }

  onSubmitRating() {
    this.finished.emit(this.roundComments);
    this.presentToast("Rating submitted. Please wait for the others to finish.");
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
