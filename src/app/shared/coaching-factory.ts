import {Coaching} from "./coaching";

export class CoachingFactory {

  static empty():Coaching {
    return new Coaching(0,0,0)
  }

  static fromObject(rawCoaching: any):Coaching {
    return new Coaching(
      rawCoaching.id,
      rawCoaching.user_id,
      rawCoaching.offer_id
    );
  }
}
