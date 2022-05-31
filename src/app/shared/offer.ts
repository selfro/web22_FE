import {Coaching} from "./coaching";
import {User} from "./user";
export {Coaching} from "./coaching";


export class Offer {
  constructor(public id: number, public user_id: number, public lva: string,
              public date: Date, public start: Date, public end: Date, public comment: string,
              public isBooked: boolean, public bookedUser?: number, public bookedUserFirstname?: string,
              public coachings?: Coaching[], public user?:User
           ) {
  }
}
