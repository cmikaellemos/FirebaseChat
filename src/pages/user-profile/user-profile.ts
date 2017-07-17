import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser : User;
  canEdit : boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService : AuthService,
    public userService : UserService
  ) {
  }

  ionViewCanEnter() : Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .subscribe((user : User) => {
        this.currentUser = user;
      })
  }

  onSubmit(event : Event) : void {
    event.preventDefault();
    this.editUser();
  }

  private editUser(photourl? : string) : void {
    this.userService.edit({
      name : this.currentUser.name,
      username : this.currentUser.username,
      photo : photourl || this.currentUser.photo || ''
    }).then(() => {
      this.canEdit = false;
    })
  }
}
