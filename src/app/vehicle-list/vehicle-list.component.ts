import { Component, Input, effect } from '@angular/core';
// import { User } from '../services/vehicledatabase.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { VehicleDatabaseService } from '../services/vehicledatabase.service';
import { VehicleListModel } from '../Model/VehicleList.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})

export class VehicleListComponent {
  @Input() name?: string;
  // users = this.database.getUsers();
  newUserName = '';
  description = '';
  showAddVehicle = false;
  vehilceList: Array<VehicleListModel> = [
    // {
    // 'vehiclename': 'TEST 1',
    // 'vehicleno': 'TEST 2'
  // }
];

  constructor(private database: VehicleDatabaseService) {
    effect(() => {
      // console.log('Users changed', this.users());
    });
    this.loadVehilcesList();
  }

  loadVehilcesList(){
    this.database.getVehiclesList().subscribe({
      next: (d) => {
        JSON.parse(JSON.stringify(d)).forEach((res:any) => {
          // console.log('data', res);
          this.vehilceList.push(res);
        })
          // console.log('d', JSON.parse(JSON.stringify(d)))
      },
    });
  }
  // async createUser() {
  //   if (this.newUserName != '') {
  //     await this.database.addUser(this.newUserName, this.description);
  //     this.showAddVehicle = false;
  //     await this.database.getVehiclesList();
  //   }
  // }

  async createVehicleList(){
    if (this.newUserName != '') {
      // this.database.createVehiclesList({'vehicleno': this.newUserName, 'vehiclename': this.description});
      let temp = {'vehicleno': this.newUserName, 'vehiclename': this.description};

      this.database.createVehiclesList(temp).subscribe(
        {
        next: (d) => {
            console.log('d', d)
            this.loadVehilcesList();
            this.showAddVehicle = false;
        },
      });

    }
  }

  // updateUser(user: User) {
  //   const acitve = user.active ? true : false;
  //   this.database.updateUserById(user.id.toString(), acitve);
  // }

  deleteUser(user: VehicleListModel) {
    this.database.deleteVehiclesList(user).subscribe(
      {
      next: (d) => {
          console.log('d', d)
          this.loadVehilcesList();
          this.showAddVehicle = false;
      },
    });
  }

  // VehicleAvailable(user: User) {
  //   this.database.updateUserById(user.id.toString(), true);
  // }

  // VehicleNotAvailable(user: User) {
  //   this.database.updateUserById(user.id.toString(), false);
  // }

  // createVehicleList(data: VehicleListModel){

  // }
  // async createUser() {
  //   await this.database.addUser(this.newUserName);
  // }
}

// export interface VehicleListModel { 
// 	vehiclename: string;
// 	vehicleno: string;
// }; 