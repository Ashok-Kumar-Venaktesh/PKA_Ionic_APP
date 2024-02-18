import { Component, Input, effect } from '@angular/core';
import { DatabaseService, User } from '../services/database.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  @Input() name?: string;
  users = this.database.getUsers();
  newUserName = 'abc';

  constructor(private database: DatabaseService) {
    effect(() => {
      console.log('Users changed', this.users());
    });

    // this.createUser();
  }

  async createUser() {
    await this.database.addUser(this.newUserName);
  }

  updateUser(user: User) {
    const acitve = user.active ? true : false;
    this.database.updateUserById(user.id.toString(), acitve);
  }

  VehicleAvailable(user: User) {
    this.database.updateUserById(user.id.toString(), true);
  }

  VehicleNotAvailable(user: User) {
    this.database.updateUserById(user.id.toString(), false);
  }
  // async createUser() {
  //   await this.database.addUser(this.newUserName);
  // }
}
