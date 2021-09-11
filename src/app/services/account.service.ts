import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../models/Account";

const ACCOUNT_API = 'http://localhost:8080/api/accounts/';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  public getAccountByLogin(login: string): Observable<any> {
    return this.http.get(ACCOUNT_API + login);
  }

  public getCurrentAccount(): Observable<any> {
    return this.http.get(ACCOUNT_API + 'current');
  }

  public updateAccount(account: Account): Observable<any> {
    return this.http.patch(ACCOUNT_API, {
      id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      gender: account.gender,
      login: account.login
    });

  }

  public getAccountLogins(): Observable<any> {
    return this.http.get(ACCOUNT_API + 'logins');
  }

}
