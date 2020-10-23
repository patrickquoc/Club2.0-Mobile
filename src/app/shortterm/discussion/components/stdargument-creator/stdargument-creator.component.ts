import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';

@Component({
  selector: 'app-stdargument-creator',
  templateUrl: './stdargument-creator.component.html',
  styleUrls: ['./stdargument-creator.component.scss'],
})
export class STDArgumentCreatorComponent implements OnInit {
  @Input() discussion: ShortTermDiscussion;  
  @Output() finished = new EventEmitter<string>();
  argument: string;

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  onSubmit() {
    if(this.argument.length == 0) {
      this.presentToast("Please enter an argument");
    }
    else {
      this.finished.emit(this.argument);
      this.presentToast("Sending argument. Please wait for the others to finish.");
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
