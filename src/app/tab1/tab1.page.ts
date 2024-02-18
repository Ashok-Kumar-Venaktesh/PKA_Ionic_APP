import { Component, effect } from '@angular/core';
import { DatabaseService, User } from '../services/database.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  users = this.database.getUsers();
  newUserName = '';

  constructor(private database: DatabaseService) {
    effect(() => {
      console.log('Users changed', this.users());
    });
  }

  async createUser() {
    await this.database.addUser(this.newUserName);
  }

  updateUser(user: User) {
    const acitve = user.active ? true : false;
    this.database.updateUserById(user.id.toString(), acitve);
  }

  // async createUser() {
  //   await this.database.addUser(this.newUserName);
  // }
}
