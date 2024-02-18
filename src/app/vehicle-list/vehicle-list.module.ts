import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { VehicleListComponent } from './vehicle-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [VehicleListComponent],
  exports: [VehicleListComponent],
})
export class VehicleListComponentModule {}
