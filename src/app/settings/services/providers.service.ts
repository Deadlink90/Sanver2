import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { providerModel } from '../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  URL_API:string='http://localhost:3000/api/providers'
  constructor(private http:HttpClient) { }

  obtainProviders(){
  return this.http.get<providerModel[]>(this.URL_API);  
  }

  createProvider(data:providerModel){
  return this.http.post(this.URL_API,data);
  }

  editProvider(data:any,id:any){
  return this.http.patch(`${this.URL_API}/${id}`,data);
  }

  obtainProvider(id:any){
  return this.http.get<providerModel>(`${this.URL_API}/${id}`);
  }

}
