import {User} from "./user";
import {Offer} from "./offer";

export class Coaching {
  constructor(public id: number, public user_id: number, public offer_id: number,
              public user?: User, public offer?: Offer) {
  }
}
