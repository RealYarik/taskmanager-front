import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AccountService} from "../services/account.service";
import {Account} from "../models/Account";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MsGuardForCurrentAccountService implements CanActivate {

  account: Account;

  constructor(private router: Router,
              private accountService: AccountService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let penfriend = route.params.login;

    return this.checkLogin(penfriend);
  }

  checkLogin(login: string): Observable<boolean> {
    return this.accountService.getCurrentAccount().pipe(
      map((res) => {
        if ((res as Account).login != login) {
          return true;
        }
        this.router.navigate(['messages']);
        return false;
      }));
  }
}
