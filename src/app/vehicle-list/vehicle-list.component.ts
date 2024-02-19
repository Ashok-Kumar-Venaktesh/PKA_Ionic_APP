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
  newUserName = '';
  description = '';
  vehiclename = '';
  showAddVehicle = false;
  isLoading = true;
  vehilceList: Array<VehicleListModel> = [
];

  constructor(private database: VehicleDatabaseService) {
    effect(() => {
    });
    this.loadVehilcesList();
  }

  loadVehilcesList(){
    this.vehilceList = [];
    this.isLoading = true;
    this.database.getVehiclesList().subscribe({
      next: (d) => {
        JSON.parse(JSON.stringify(d)).forEach((res:any) => {
          this.vehilceList.push(res);
          this.isLoading = false;
        })
      },
    });
  }

  async createVehicleList(){
    if (this.newUserName != '') {
      let temp = {'vehicleno': this.newUserName, 'vehiclename': this.vehiclename, 'description': this.description};
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
 
}
