import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Coaching, Offer} from "../shared/offer";
import {KwmService} from "../shared/kwm.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferFactory} from "../shared/offer-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {CoachingFactory} from "../shared/coaching-factory";


@Component({
  selector: 'kwm-offer-user-details',
  templateUrl: './offer-user-details.component.html',
  styles: []
})
export class OfferUserDetailsComponent implements OnInit {

  offer: Offer = OfferFactory.empty();
  coaching: Coaching = CoachingFactory.empty();


  constructor(
    private kwm: KwmService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.kwm.getSingle(params['id']).subscribe(o => this.offer = o);
  }

  removeOffer() {
    if (confirm('Willst du das Angebot wirklich löschen?')) {
      this.kwm.remove(this.offer.id).subscribe(res => this.router.navigate(['../'],
        {relativeTo: this.route}));
      this.toastr.success("Angebot wurde erfolgreich gelöscht!", "Gelöscht");
    }
  }
}
