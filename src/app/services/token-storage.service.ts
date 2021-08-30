import {Injectable} from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return <string>sessionStorage.getItem(TOKEN_KEY);
  }

  public saveAccount(account: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(account));
  }

  public getAccount(): number | null {
    return JSON.parse(<string>sessionStorage.getItem(USER_KEY));
  }

  public logout(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
