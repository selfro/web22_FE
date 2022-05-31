import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders : {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    });
    return next.handle(req);
  }
}
