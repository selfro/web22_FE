import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {OfferListComponent} from "./offer-list/offer-list.component";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {OfferUserListComponent} from "./offer-user-list/offer-user-list.component";
import {OfferUserDetailsComponent} from "./offer-user-details/offer-user-details.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'offers', component:OfferListComponent},
  {path: 'offers/:id', component:OfferDetailsComponent},
  {path: 'admin', component:OfferFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'admin/:id', component:OfferFormComponent,  canActivate:[CanNavigateToAdminGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'offers/user/:id', component:OfferUserListComponent},
  {path: 'offers/user/:id/:id', component:OfferUserDetailsComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule{}
