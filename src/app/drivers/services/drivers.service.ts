import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { driverResponse } from '../models/response.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { driverModel } from '../models/driver.model';
import { response } from 'src/app/global/models/response.model';

interface driversArray{
drivers:driverModel[];  
}

interface ruta{
  nombre:string
  _id:any  
  }

@Injectable({
  providedIn: 'root',
})

export class DriversService {
  URL_API: string = 'http://localhost:3000/api/drivers';
  URL_API_RUTAS = 'http://localhost:3000/api/rutas'

  constructor(
    private http: HttpClient,
    private activeRoute:ActivatedRoute
  ) {}

  obtainDrivers(page: number, limit: number) {
    
    return this.http.get<driverResponse>(
      `${this.URL_API}?page=${page}&limit=${limit}`
    );
  }

  obtainDriversQuerys(page: number, limit: number) {
    return this.activeRoute.queryParams.pipe(
      switchMap((params) => {
        let paramss = new HttpParams();

        Object.keys(params).forEach(key => {
          const value = params[key];

          if(value){
         paramss = paramss.set(key,value);
          }
        })

        console.log(paramss);
        return this.http.get<driverResponse>(`${this.URL_API}?page=${page}&limit=${limit}`, {
          params: paramss,
        });
      })
    );
  }

  obtainDriversExcel(){
    return this.activeRoute.queryParams.pipe(
      switchMap((params) => {
        let paramss = new HttpParams();

        Object.keys(params).forEach(key => {
          const value = params[key];

          if(value){
         paramss = paramss.set(key,value);
          }
        })

        return this.http.get<driverResponse>(`${this.URL_API}/document`, {
          params: paramss,
        });
      })
    );

  }

  obtainDriver(_id:any){
  return this.http.get<driverModel>(`${this.URL_API}/${_id}`)
  }

  createDriver(driver:driverModel){
  return this.http.post<response>(this.URL_API,driver);
  }

  editDriver(data:any,id:any){
  return this.http.patch<driverModel>(`${this.URL_API}/${id}`,data) 
  }

  reactivateDriver(id:any){
  return this.http.patch<driverModel>(`${this.URL_API}/${id}`,{status:'activo'})  
  }

  obtainRutas(){
  return this.http.get<ruta[]>(`${this.URL_API_RUTAS}/active`);
  }
  
}
