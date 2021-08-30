import {Component, OnInit} from '@angular/core';
import {Account} from "../../models/Account";
import {TokenStorageService} from "../../services/token-storage.service";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  account: Account;

  constructor(private tokenService: TokenStorageService,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      this.accountService.getCurrentAccount()
        .subscribe(data => {
          this.account = data;
          this.isDataLoaded = true;
        });
    }
  }

  logout(): void {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }

}
