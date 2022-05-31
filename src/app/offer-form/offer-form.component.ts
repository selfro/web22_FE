import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KwmService} from "../shared/kwm.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferFactory} from "../shared/offer-factory";
import {OfferFormErrorMessages} from "./offer-form-error-messages";
import {Offer} from "../shared/offer";
import {ToastrService} from "ngx-toastr";
import {DateValidators} from "../shared/date-validators";

@Component({
  selector: 'kwm-offer-form',
  templateUrl: './offer-form.component.html',
  styles: []
})
export class OfferFormComponent implements OnInit {

  offerForm: FormGroup;
  offer = OfferFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingOffer = false;


  constructor(private fb: FormBuilder,
              private kwm: KwmService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService)
  {
    this.offerForm = this.fb.group({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingOffer = true;
      this.kwm.getSingle(id).subscribe(offer => {
        this.offer = offer;
        this.initOffer();
      });
    }
    this.initOffer();
  }

  initOffer() {
    this.offerForm = this.fb.group({
      id: this.offer.id,
      lva: [this.offer.lva, Validators.required],
      date: [this.offer.date, [
        Validators.required,
        DateValidators.dateFormat]],
      start: [this.offer.start, Validators.required],
      end: [this.offer.end, Validators.required]

    });
    this.offerForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    })
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of OfferFormErrorMessages) {
      const control = this.offerForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const offer: Offer = OfferFactory.fromObject(this.offerForm.value);
    if (this.isUpdatingOffer) {
      this.kwm.update(offer).subscribe(res => {
        this.router.navigate(["../../offers", offer.id], {relativeTo: this.route});
      })
    } else {
      offer.user_id = sessionStorage["userId"];
      this.kwm.create(offer).subscribe(res => {
        this.offer = OfferFactory.empty();
        this.offerForm.reset(offer);
        this.router.navigate(["../offers/user/{id}"], {relativeTo: this.route});
      });
    }
  }
}
