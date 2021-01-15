import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './service/http.service';
import { AuthService } from './service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { DatePipe } from '@angular/common';
import { ToastService } from './service/toast.service';
import { SocketService } from './service/socket.service';
const config: SocketIoConfig = { 
  url: `${environment.wsConnection}`, 
  options: {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax' : 5000,
    'reconnectionAttempts': 10
  } 
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpService,
    AuthService,
    ToastService,
    SocketService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
