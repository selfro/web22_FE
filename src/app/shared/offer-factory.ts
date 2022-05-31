import {Offer} from "./offer";

export class OfferFactory {

  static empty():Offer {
    return new Offer(0, 0, '', new Date(), new Date(), new Date(), "",false);
  }

  static fromObject(rawOffer: any):Offer {
    return new Offer(
      rawOffer.id,
      rawOffer.user_id,
      rawOffer.lva,
      typeof (rawOffer.date)==='string' ? new Date(rawOffer.date) : rawOffer.date,
      typeof (rawOffer.start)==='string' ? new Date(rawOffer.start) : rawOffer.start,
      typeof (rawOffer.end)==='string' ? new Date(rawOffer.end) : rawOffer.end,
      rawOffer.comment,
      rawOffer.coachings
    );
  }

}
