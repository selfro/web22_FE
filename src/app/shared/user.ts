export class User {
  constructor(public id: number, public firstName: string, public lastName:string, public semester:string,
              public email:string, public password:string, public isTutor:boolean,
              public description:Text, public image:string) {
  }
}
