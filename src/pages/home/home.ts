import { Chat } from './../../models/chat.model';
import { ChatService } from './../../providers/chat.service';
import { ChatPage } from './../chat/chat';
import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';
import { FirebaseListObservable } from 'angularfire2';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  view : string = 'chats';
  users : FirebaseListObservable<User[]>;
  chats : FirebaseListObservable<Chat[]>;

    constructor(
      public authService : AuthService,
      public chatService : ChatService,
      public menuCtrl : MenuController,
      public navCtrl: NavController,
      public userService: UserService
    ) {
      
  }

  ionViewCanEnter() : Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.users = this.userService.users;
    this.chats = this.chatService.chats;

    this.menuCtrl.enable(true, 'user-menu');
  }
  
  onSignUp() : void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(recipientUser : User) : void {
    
    this.userService.currentUser.first().subscribe((currentUser : User) => {
      this.chatService.getDeepChat(currentUser.$key, recipientUser.$key)
        .first().subscribe((chat : Chat) => {
          console.log('Chat: ', chat);
          if(chat.hasOwnProperty('$value')) {
            let timestamp : Object = firebase.database.ServerValue.TIMESTAMP;
            
            let chat1 = new Chat('', timestamp, recipientUser.name, '');
            this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

            let chat2 = new Chat('', timestamp, currentUser.name, '');
            this.chatService.create(chat2, recipientUser.$key, currentUser.$key);
          }
        })
    })

    this.navCtrl.push(ChatPage, {recipientUser : recipientUser});
  }

  filterAny(event : any) : void {
    let search : string = event.target.value;

    this.users = this.userService.users;
    this.chats = this.chatService.chats;

    switch(this.view) {
      case 'chats':
        this.chats = <FirebaseListObservable<Chat[]>>this.chats.map((chats : Chat[]) => {
          return chats.filter((chat : Chat) => {
            return (chat.title.toLowerCase().indexOf(search.toLowerCase()) > -1);
          });
        });
        break;

      case 'users':
        this.users = <FirebaseListObservable<User[]>>this.users.map((users : User[]) => {
          return users.filter((user : User) => {
            return (user.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
          });
        });
        break;
    }

  }
  onChatOpen(chat: Chat): void {
    let recipientUserId: string = chat.$key;

    this.userService.get(recipientUserId)
      .first().subscribe((user: User) => {
        this.navCtrl.push(ChatPage, { recipientUser : user });
      });
  }
}
