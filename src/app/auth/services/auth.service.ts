import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resInterface } from '../models/res.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  URL_API='http://localhost:3000/api/auth';

  constructor(private http:HttpClient) { }

  LogIn(loginBody:any){
  return this.http.post<resInterface>(`${this.URL_API}/signin`,loginBody)
  }

  checkToken(){
    return this.http.get<resInterface>(`${this.URL_API}/admin`)
  }

}
