import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { Argument } from 'src/app/entity/argument';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-stdrating',
  templateUrl: './stdrating.component.html',
  styleUrls: ['./stdrating.component.scss'],
})
export class STDRatingComponent{
  @Input() roundArguments: STDArgument[];
  @Input() discussion: ShortTermDiscussion;
  @Input() user: string;
  @Output() finished = new EventEmitter<STDArgument[]>();

  constructor(private toastController: ToastController) { }

  onLike(argument: STDArgument) {
    argument.rating[0] == 0 ? argument.rating[0] = 1 : argument.rating[0] = 0;
    argument.rating[1] = 0;
  }

  onDislike(argument: STDArgument) {
    argument.rating[1] == 0 ? argument.rating[1] = 1 : argument.rating[1] = 0;
    argument.rating[0] = 0;
  }

  hasLiked(argument: STDArgument) {
    return argument.rating[0] == 1;
  }


  hasDisliked(argument: STDArgument) {
    return argument.rating[1] == 1;
  }

  onSubmitRating() {
    this.finished.emit(this.roundArguments);
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
