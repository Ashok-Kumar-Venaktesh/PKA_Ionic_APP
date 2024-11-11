import { Component, Input } from '@angular/core';
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
  newUserName = '';
  description = '';
  showAddVehicle = false;
  vehicleStatus: Array<VehicleListModel> = [];
  message = '';
  isOpen = false;
  isToastOpen = false;
  isLoading = true;

  constructor(private database: VehicleDatabaseService) {
    this.loadVehiclesList();
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  loadVehiclesList() {
    this.isLoading = true;
    this.vehicleStatus = [];
    const order = ['jcb', 'bobcat', 'roller', 'tipper', 'tractor'];

    this.database.getVehiclesList().subscribe({
      next: (data) => {
        // Parse data and sort according to the custom order
        this.vehicleStatus = JSON.parse(JSON.stringify(data)).sort((a: VehicleListModel, b: VehicleListModel) => {
          // Normalize vehicle names to lowercase for consistent comparison
          const nameA = a.vehiclename.trim().toLowerCase();
          const nameB = b.vehiclename.trim().toLowerCase();
          const indexA = order.indexOf(nameA);
          const indexB = order.indexOf(nameB);

          // Sort based on the order array; undefined items go to the end
          return (indexA === -1 ? order.length : indexA) - (indexB === -1 ? order.length : indexB);
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load vehicle list:', err);
        this.isLoading = false;
        this.message = 'Error loading vehicles. Please try again later.';
        this.setOpen(true);
      }
    });
  }

  onClickStatus(vehicle: VehicleListModel, status: string) {
    console.log('Updating status:', vehicle, status);
    vehicle.vehiclestatus = status;
    this.database.updateVehiclesList(vehicle).subscribe({
      next: () => {
        console.log('Status updated successfully');
        this.message = `${vehicle.vehicleno} status updated!`;
        this.setOpen(true);
      },
      error: (err) => {
        console.error('Failed to update vehicle status:', err);
        this.message = `Error updating ${vehicle.vehicleno} status. Please try again.`;
        this.setOpen(true);
      }
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadVehiclesList();
      event.target.complete();
    }, 2000);
  }
}
