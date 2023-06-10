import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rutaModel } from '../models/ruta.model';

@Injectable({
  providedIn: 'root',
})
export class RutasService {
  URL_API: string = 'http://localhost:3000/api/rutas';
  constructor(private http: HttpClient) {}

  obtainRutas() {
    return this.http.get<rutaModel[]>(this.URL_API);
  }

  editarRuta(data: string, id: any) {
    return this.http.patch(`${this.URL_API}/${id}`, { nombre: data });
  }

  deleteRuta(id: any) {
    return this.http.patch(`${this.URL_API}/${id}`, { status: 'inactivo' });
  }

  reactivateRuta(id: any) {
    return this.http.patch(`${this.URL_API}/${id}`, { status: 'activo' });
  }

  createRuta(data:any){
    return this.http.post(this.URL_API,{nombre:data});
  }
}
