import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TestGuard } from './global/guards/test.guard';
import { TokenInterceptor } from './admin/interceptors/token.interceptor';
import { NoLoginGuard } from './global/guards/no-login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SesionService } from './global/services/sesion.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
  TestGuard,
  NoLoginGuard,
    {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true  
    },
    SesionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
