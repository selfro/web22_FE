import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./shared/authentication.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.toastr.error("Du musst dich einloggen, um den Adminbereich zu sehen!","Error");
      this.router.navigate(["../"], {relativeTo: this.route});
      return false;
    }
  }
}
