import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { SidenavModule } from './components/sidenav/sidenav.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { GetEmailChangePasswordComponent } from './pages/get-email-change-password/get-email-change-password.component';
import { VerifyOtpChangePasswordComponent } from './pages/verify-otp-change-password/verify-otp-change-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from 'ngx-ui-loader';
import { SocketService } from './pages/services/socket.service';
import { ReturnsComponent } from './pages/returns/returns.component';

const config: SocketIoConfig = { url: 'https://basketqueen.in', options: {} };
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.rectangleBounce, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5 // progress bar thickness
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GetEmailChangePasswordComponent,
    VerifyOtpChangePasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule,
    RouterModule,
    SocketIoModule.forRoot(config),
    SidenavModule,

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
