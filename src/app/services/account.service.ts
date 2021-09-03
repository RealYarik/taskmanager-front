import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const USER_API = 'http://localhost:8080/api/accounts/';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  public getAccountByLogin(login: string): Observable<any> {
    return this.http.get(USER_API + login);
  }

  public getCurrentAccount(): Observable<any> {
    return this.http.get(USER_API + 'current');
  }

}
