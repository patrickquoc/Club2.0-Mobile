import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private navController: NavController, private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return from(this.auth.isLoggedInAsync()).pipe(
        switchMap((isLoggedIn) => {
          if (!isLoggedIn) {
              this.navController.navigateRoot("login", { replaceUrl: true });
            return of(false);
          }
          return of(true);
        }),
      );
    }
  
}
