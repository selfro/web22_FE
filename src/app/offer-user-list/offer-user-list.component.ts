import {Component, OnInit} from '@angular/core';
import {Coaching, Offer} from "../shared/offer";
import {KwmService} from "../shared/kwm.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'kwm-offer-user-list',
  templateUrl: './offer-user-list.component.html',
  styles: []
})
export class OfferUserListComponent implements OnInit {

  offers: Offer[] = [];

  div1: boolean = true;
  div2: boolean = true;
  div3: boolean = true;

  constructor(private kwm: KwmService,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    //this.kwm.getAllFromUser(sessionStorage["userId"]).subscribe(res => this.offers = res);
    this.kwm.getAll().subscribe(res => this.offers = res);
    //this.kwm.getAllCoachings(this.authService.getCurrentUserId().toString()).subscribe(res => this.offers = res);
  }

  getName() {
    return sessionStorage["firstName"];
  }

  showAll() {
    this.router.navigate(["../offers/user/{id}"], {relativeTo: this.route});
  }

  isFuture(offer: Offer | any) {
    let today = new Date();
    let offerDate = new Date(offer?.date);
    return offerDate >= today;
  }

  isBooked(offer: Offer | any) {
    return offer.isBooked;
  }

  isTutor() {
    return this.authService.isTutor();
  }

  isOwnOffer(offer: Offer | any) {
    return offer.user_id === this.authService.getCurrentUserId();
  }

  tutorOrLearner(offer: Offer | any) {
    return offer.user_id === this.authService.getCurrentUserId() ||
      offer.bookedUser === this.authService.getCurrentUserId();
  }
}

