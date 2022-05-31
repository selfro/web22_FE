import {Component, Input, OnInit, Output} from '@angular/core';
import {Offer} from "../shared/offer";

@Component({
  selector: 'a.kwm-offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styles: []
})

export class OfferListItemComponent implements OnInit {

  @Input() offer: Offer | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  isFuture() {
    let today = new Date();
    if (this.offer === undefined) return false;
    let offerDate = new Date(this.offer?.date);
    return offerDate >= today;
  }
}
