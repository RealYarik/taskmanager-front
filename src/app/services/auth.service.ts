import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(account: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      login: account.login,
      password: account.password
    });
  }

  public register(account: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      firstName: account.firstName,
      lastName: account.lastName,
      login: account.login,
      password: account.password
    });
  }
}
