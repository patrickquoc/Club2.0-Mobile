import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { STDArgument } from 'src/app/entity/stdargument';

@Component({
  selector: 'app-stdcomment',
  templateUrl: './stdcomment.component.html',
  styleUrls: ['./stdcomment.component.scss'],
})
export class STDCommentComponent implements OnInit {
  @Input() discussion: ShortTermDiscussion
  @Input() argument: STDArgument;
  @Output() comment = new EventEmitter<string>();
  input: string;

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  onSubmit() {
    if(this.input.length < 1) {
      this.presentToast("Please enter a comment")
    }
    else {
      this.comment.emit(this.input);
      this.presentToast("Sending comment. Please wait for others to finish.")
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
