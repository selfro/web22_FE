import {Component, OnInit} from '@angular/core';
import {Offer} from "../shared/offer";
import {KwmService} from "../shared/kwm.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'kwm-offer-list',
  templateUrl: './offer-list.component.html',
  styles: []
})
export class OfferListComponent implements OnInit {

  offers: Offer[] = [];

  constructor(private kwm: KwmService,
              private authentication: AuthenticationService) {
  }

  ngOnInit(): void {
    this.kwm.getAll().subscribe(res => this.offers = res);
  }

  public getName() {
    return sessionStorage["firstName"];
  }

  public isTutor() {
    return this.authentication.isTutor();
  }

  isFuture(offer: Offer | any) {
    let today = new Date();
    let offerDate = new Date(offer?.date);
    return offerDate >= today;
  }

  isBooked(offer: Offer | any) {
    return offer.isBooked;
  }
}
