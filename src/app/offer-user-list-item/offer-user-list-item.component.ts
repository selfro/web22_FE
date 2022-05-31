import {Component, Input, OnInit, Output} from '@angular/core';
import {Offer} from "../shared/offer";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'a.kwm-offer-user-list-item',
  templateUrl: './offer-user-list-item.component.html',
  styles: []
})
export class OfferUserListItemComponent implements OnInit {

  @Input() offer: Offer | undefined

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  isFuture() {
    let today = new Date();
    if (this.offer == undefined)
      return false;
    else return this.offer.date > today;
  }

  isTutor() {
    return this.authService.isTutor();
  }
}
