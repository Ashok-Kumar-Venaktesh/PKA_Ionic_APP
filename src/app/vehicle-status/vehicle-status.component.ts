import { Component, Input, effect } from '@angular/core';
// import { User } from '../services/vehicledatabase.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { VehicleDatabaseService } from '../services/vehicledatabase.service';
import { VehicleListModel } from '../Model/VehicleList.model';

@Component({
  selector: 'app-vehicle-status',
  templateUrl: './vehicle-status.component.html',
  styleUrls: ['./vehicle-status.component.scss'],
})
export class VehicleStatusComponent {
  @Input() name?: string;
  // users = this.database.getUsers();
  newUserName = '';
  description = '';
  showAddVehicle = false;
   vehicleStatus: Array<VehicleListModel> = [];

  constructor() {
    effect(() => {
      // console.log('Users changed', this.users());
    });

    // this.createUser();
  }

  // async createUser() {
  //   if (this.newUserName != '') {
  //     await this.database.addUser(this.newUserName, this.description);
  //     this.showAddVehicle = false;
  //   }
  // }

  // updateUser(user: User) {
  //   const acitve = user.active ? true : false;
  //   this.database.updateUserById(user.id.toString(), acitve);
  // }

  // VehicleAvailable(user: User) {
  //   this.database.updateUserById(user.id.toString(), true);
  // }

  // VehicleNotAvailable(user: User) {
  //   this.database.updateUserById(user.id.toString(), false);
  // }
  // async createUser() {
  //   await this.database.addUser(this.newUserName);
  // }
}
