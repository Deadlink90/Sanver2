import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservablesService } from 'src/app/global/services/observables.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logLocal: any = localStorage.getItem('logCount');
  logCount: any = this.logLocal ? this.logLocal : '0';

  constructor(
    private observable: ObservablesService,
    private router: Router,
    private authService: AuthService,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.redirectToAdmin();
  }

  loginForm:FormGroup = this.fb.group({
  email:['',Validators.required],
  password:['',Validators.required]  
  })

  //envio de informacion
  sendLogin(){
  //en caso de que sea invalido
  if(this.loginForm.invalid){
    console.log('formulario invalido')
   return Object.values(this.loginForm.controls).forEach(control =>{
    control.markAsTouched();
   }) 
  }
  //si es valido continuar
  this.authService.LogIn(this.loginForm.value).subscribe(
  res => {
  if(res.status === 'true'){
  this.sucessLogin();
  localStorage.setItem('token',res.token);
  localStorage.setItem('username',res.username);
  localStorage.setItem('rol',res.rol);
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error al iniciar sesion',
      text: res.message,
      footer: '<a href="">¿Olvidaste tu contraseña?</a>'
    })  
  }

  },
  err => {
   console.log(`Algo salio Mal: ${err}`);
   Swal.fire({
    icon: 'error',
    title: 'Error de conexion (500).',
    text: 'El servidor no responde, si el problema persiste contacte con un administrador.',
  })  
  }

  )
  

  }

  //gets de inputs
  get emailValidator(){
  return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched  
  }

  get passValidator(){
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched  
    }

  redirectToAdmin() {
    if (localStorage.getItem('isLoged')) {
      this.router.navigate(['/admin/main']);
    }
  }

  sucessLogin() {
    this.observable.userLoged$.emit(true);
    localStorage.setItem('isLoged', 'true');
    this.logCount++;
    localStorage.setItem('logCount', this.logCount);
    this.router.navigate(['/admin/inicio']);
  }
}
