import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferListItemComponent } from './offer-list-item/offer-list-item.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import {KwmService} from "./shared/kwm.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { OfferFormComponent } from './offer-form/offer-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {LoginInterceptorService} from "./shared/login-interceptor.service";
import {registerLocaleData} from "@angular/common";
import localDe from "@angular/common/locales/de";
import { OfferUserListComponent } from './offer-user-list/offer-user-list.component';
import {OfferUserListItemComponent} from "./offer-user-list-item/offer-user-list-item.component";
import {OfferUserDetailsComponent} from "./offer-user-details/offer-user-details.component";

registerLocaleData(localDe);

@NgModule({
  declarations: [
    AppComponent,
    OfferListComponent,
    OfferListItemComponent,
    OfferDetailsComponent,
    HomeComponent,
    OfferFormComponent,
    LoginComponent,
    OfferUserListComponent,
    OfferUserListItemComponent,
    OfferUserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [KwmService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'de'
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
