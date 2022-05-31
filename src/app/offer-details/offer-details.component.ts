import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Coaching, Offer} from "../shared/offer";
import {KwmService} from "../shared/kwm.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferFactory} from "../shared/offer-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoachingFactory} from "../shared/coaching-factory";
import {OfferFormErrorMessages} from "../offer-form/offer-form-error-messages";

@Component({
  selector: 'kwm-offer-details',
  templateUrl: './offer-details.component.html',
  styles: []
})
export class OfferDetailsComponent implements OnInit {

  commentForm: FormGroup;
  offer: Offer = OfferFactory.empty();
  coaching: Coaching = CoachingFactory.empty();
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private kwm: KwmService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthenticationService) {
    this.commentForm = this.fb.group({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.kwm.getSingle(id).subscribe(o => {
        this.offer = o;
        this.initComment();
      });
    }
    this.initComment();
  }

  initComment() {
    this.commentForm = this.fb.group({
      comment: [this.offer.comment, [Validators.required]]
    });
    this.commentForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of OfferFormErrorMessages) {
      const control = this.commentForm.get(message.forControl);
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

  removeOffer() {
    if (confirm('Willst du das Angebot wirklich löschen?')) {
      this.kwm.remove(this.offer.id).subscribe(res => this.router.navigate(['../'],
        {relativeTo: this.route}));
      this.toastr.success("Angebot wurde erfolgreich gelöscht!", "Gelöscht");
    }
  }

  saveComment() {
    const val = this.commentForm.value;
    const id = this.route.snapshot.params["id"];
    this.kwm.getSingle(id).subscribe(offer => {
      this.offer = offer;
      if (id) {
        this.offer.comment = val.comment;
        this.kwm.saveComment(offer).subscribe(res => {
          this.commentForm.reset();
          this.toastr.success("Danke für deine Anfrage, der*die Tutor*in meldet sich bei dir!", "Danke");
          this.router.navigate(["../"], {relativeTo: this.route});
        });
      }
    });
  }

  bookOffer() {
    if (this.authService.isLoggedIn()) {
      // if logged in
      if (confirm("Willst du diese Nachhilfe wirklich buchen?")) {

        const id = this.route.snapshot.params["id"];
        this.kwm.getSingle(id).subscribe(offer => {
          this.offer = offer;
          if (id) {
            this.offer.isBooked = true;

            // get current user (lernender)
            this.offer.bookedUser = this.authService.getCurrentUserId();
            this.offer.bookedUserFirstname = this.authService.getCurrentUserName();
            // save in db
            this.kwm.saveComment(offer).subscribe(res => {

              this.kwm.bookOffer(offer).subscribe(res => {
                this.toastr.success("Super! Du hast die Nachhilfe gebucht. Wir wünschen dir viel Erfolg.", "Gebucht!");
                this.router.navigate(["../"], {relativeTo: this.route});
              });
            });
          }
        });
      }
    }
    // if not logged in
    else {
      this.toastr.error("Du musst dich zuerst einloggen, bevor du eine Nachhilfe buchen kannst.", "Sorry!");
    }
  }
}
