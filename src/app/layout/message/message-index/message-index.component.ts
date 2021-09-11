import {Component, OnInit} from '@angular/core';
import {Account} from "../../../models/Account";
import {Message} from "../../../models/Message";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AccountService} from "../../../services/account.service";
import {MessageService} from "../../../services/message.service";
import {TimeService} from "../../../services/time.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-message-index',
  templateUrl: './message-index.component.html',
  styleUrls: ['./message-index.component.css']
})
export class MessageIndexComponent implements OnInit {

  formControl = new FormControl();
  filteredLogins: Observable<string[]>;
  isLoggedIn = false;
  isDataLoaded = false;
  isNoData = true;
  account: Account;
  messagesData: any;
  messagesMapArray: [
    name: string,
    message: Message[]
  ][];
  logins: string[];
  isLoginsLoaded = false;
  input;

  constructor(private tokenService: TokenStorageService,
              private accountService: AccountService,
              private messageService: MessageService,
              public timeService: TimeService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      this.accountService.getAccountLogins().subscribe(ref => {
        this.logins = ref;
        this.isLoginsLoaded = true;
        this.filteredLogins = this.formControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      });

      this.messageService.getMessagesForCurrentAccountWithSpecificPenfriend()
        .subscribe(data => {
          this.messagesData = data;
          this.accountService.getCurrentAccount().subscribe(dataAcc => {
            this.account = dataAcc;
            this.isDataLoaded = true;
          });
          this.messagesMapArray = Object.entries(this.messagesData);
          if (this.messagesMapArray.length == 0) {
            this.isNoData = false;
          }
        });
    }
  }

  goToChat() {
    if (this.input != '') {
      this.router.navigate(['/messages/' + this.input + '/chat']);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.logins.filter(option => option.toLowerCase().includes(filterValue));
  }
}
