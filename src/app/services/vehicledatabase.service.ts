import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { VehicleListModel } from '../Model/VehicleList.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleDatabaseService {
  private url: string = 'https://pka-backend-service.onrender.com';
  // private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getVehiclesList(){
      return this.http.get(`${this.url}/vehicles_list`)
  }

  updateVehiclesList(data:VehicleListModel){
    return this.http.put(`${this.url}/vehicles_list`, data)
  }

  createVehiclesList(data:any){
    return this.http.post(`${this.url}/vehicles_list`, data)
  }

  deleteVehiclesList(data:VehicleListModel){
    return this.http.post(`${this.url}/vehicles_list/delete`, data)
  }

}
