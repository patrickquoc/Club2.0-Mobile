import { Component, OnInit } from '@angular/core';
import { ShortTermDiscussion } from 'src/app/entity/short-term-discussion';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-stddetail',
  templateUrl: './stddetail.page.html',
  styleUrls: ['./stddetail.page.scss'],
})
export class STDDetailPage implements OnInit {
  selectedDiscussion: ShortTermDiscussion;
  constructor(private route: ActivatedRoute, private http: HttpService, private auth: AuthService, 
    private toastController: ToastController, private alertController: AlertController,
    private navController: NavController, private dataService: DataService) { }

  ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.selectedDiscussion = this.route.snapshot.data['special'];
    }
  }

  async joinStd() {
    if(this.selectedDiscussion.privateFlag) {
      const alert = this.alertController.create({
        header: 'Enter Password',
        inputs: [
          {
            name: 'password',
            placeholder: 'Password',
            type: "password"
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

              try {
                const res = await this.http.joinStd(
                  this.selectedDiscussion.discussionId,
                  await this.auth.getUsername(),
                  data.password
                );
                this.dataService.setData(res.discussionId, res);
                this.navController.navigateForward('participate/std/'+ res.discussionId, {replaceUrl: true});
              } catch (error) {
                this.presentToast(error.error);
              }
            }
          }
        ]
      });
      (await alert).present();
    }
    else {
      try {
        
        const res = await this.http.joinStd(this.selectedDiscussion.discussionId, await this.auth.getUsername());
        this.dataService.setData(res.discussionId, res);
        this.navController.navigateForward('participate/std/'+ res.discussionId, {replaceUrl: true});
      } catch (error) {
        this.presentToast(error.error);
      }
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
