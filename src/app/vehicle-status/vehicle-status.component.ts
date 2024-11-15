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
   vehicleStatus: Array<VehicleListModel> = [
  ];
  message = '';
  isOpen = false;
  isToastOpen = false;
  isLoading = true;


   constructor(private database: VehicleDatabaseService) {
    effect(() => {
    });
    this.loadVehilcesList();
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  loadVehilcesList(){
    this.isLoading = true;
    this.vehicleStatus = [];
    this.database.getVehiclesList().subscribe({
      next: (d) => {
        JSON.parse(JSON.stringify(d)).forEach((res:any) => {
          this.vehicleStatus.push(res);
          this.isLoading = false;
        })
      },
    });
  }

  onClickStatus(v: VehicleListModel, status: string){
    console.log('will be updated ', v, status);
    v.vehiclestatus = status;
    this.database.updateVehiclesList(v).subscribe({
      next: (d) => {
        console.log('updated successfully');
        // this.loadVehilcesList();
        this.message = `${v.vehicleno} status updated!`
        this.setOpen(true);

      }
    })
  } 

  
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.loadVehilcesList();
      event.target.complete();
    }, 2000);
  }
  
}
