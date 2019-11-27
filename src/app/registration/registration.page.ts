import { Component, OnInit } from '@angular/core';
import { UserregisterService } from '../services/userregister.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  private inputEmail = "";
  errorMessage: string;
  successMessage: string;

  inputStyle: string = 'inputStyle1';

  constructor(private userRegisterService: UserregisterService, private alertCtrl: AlertController,
    public loadingController: LoadingController
   ) {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 3000,
      spinner: 'crescent',
      cssClass: 'loaderClass'
    });
    return await loading.present();
  }

  inputFocus(){
    this.inputStyle = 'inputStyle2';
  }

  register()
  {
    // checking if the user exists in firestore
    // if(this.inputEmail == "")
    // {
    //   this.alert("Empty Field", "Fill all the field(s)");
    // }
    // else{
    //   this.firestore.collection<any> ( `participants` , 
    //   ref => ref.where('email','==',this.inputEmail))
    //        .snapshotChanges().subscribe(data =>{     
    //            if(data.length > 0)
    //            {
    //              this.alert("Exists", "Participant is already added");
    //              console.log(data);
    //            }
    //            else{
    //              this.userRegisterService.getUser(this.inputEmail, '12345');
    //              this.alert("Registration Successful","Participant is registered for the conference");
    //              console.log(data);
    //            }
    //       }) 
    // }

    let value =  {
      email : this.inputEmail,
      passwd: "cfc@2019"
    }
    if(this.inputEmail == "")
    {
      this.alertError("Empty Field", "Fill all the field(s)");
    }
    else{
      this.presentLoading();
      this.userRegisterService.registerUser(value)
      .then(res => {
        console.log(res);
        this.successMessage = "Account has been created";
        this.loadingController.dismiss();          
        this.alert("Registration Successful", this.successMessage);
      }, err => {
        this.loadingController.dismiss();          
        console.log(err.message);
        this.errorMessage = err.message;
        this.loadingController.dismiss();          

        this.alertError("Registration faliure", err.message);
        this.loadingController.dismiss();          

        this.successMessage = "";
      }) 
    }   
  }

  async alert(header:string,message:any) {
    const alert = await this.alertCtrl.create({
      header: header,
      cssClass:'alert',
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.inputEmail = "";
          }
        }
      ]
    });
    await alert.present();
  }

  async alertError(header:string,message:any) {
    const alert = await this.alertCtrl.create({
      header: header,
      cssClass:'alertError',
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.inputEmail = "";
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnInit() {
  }





  

}
