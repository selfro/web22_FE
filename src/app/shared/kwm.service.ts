import {Injectable} from '@angular/core';
import {Coaching, Offer} from "./offer";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class KwmService {

  private api = 'http://kwm.s1910456010.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/offers`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(offer: Offer): Observable<any> {
    return this.http.post(`${this.api}/offers`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createCoaching(coaching: Coaching): Observable<any> {
    return this.http.post(`${this.api}/coachings`, coaching)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  bookOffer(offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/bookoffer/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  saveComment(offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/savecomment/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
