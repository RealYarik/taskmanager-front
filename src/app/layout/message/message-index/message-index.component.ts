import {Component, OnInit} from '@angular/core';
import {Account} from "../../../models/Account";
import {Message} from "../../../models/Message";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AccountService} from "../../../services/account.service";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-message-index',
  templateUrl: './message-index.component.html',
  styleUrls: ['./message-index.component.css']
})
export class MessageIndexComponent implements OnInit {


  isLoggedIn = false;
  isDataLoaded = false;
  account: Account;
  messagesData: any;
  messagesMapArray: [
    name: string,
    message: Message[]
  ][];

  constructor(private tokenService: TokenStorageService,
              private accountService: AccountService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      this.messageService.getMessagesForCurrentAccountWithSpecificPenfriend()
        .subscribe(data => {
          this.messagesData = data;
          this.accountService.getCurrentAccount().subscribe(dataAcc => {
            this.account = dataAcc;
            this.isDataLoaded = true;
          });
          this.messagesMapArray = Object.entries(this.messagesData);
        });
    }
  }

  timeAgo(someDateInThePast): string {
    let result = '';
    const difference = Date.now() - someDateInThePast;

    if (difference < 5 * 1000) {
      return 'just now';
    } else if (difference < 90 * 1000) {
      return 'moments ago';
    }

    //it has minutes
    if ((difference % 1000 * 3600) > 0) {
      if (Math.floor(difference / 1000 / 60 % 60) > 0) {
        let s = Math.floor(difference / 1000 / 60 % 60) == 1 ? '' : 's';
        result = `${Math.floor(difference / 1000 / 60 % 60)} minute${s} `;
      }
    }

    //it has hours
    if ((difference % 1000 * 3600 * 60) > 0) {
      if (Math.floor(difference / 1000 / 60 / 60 % 24) > 0) {
        let s = Math.floor(difference / 1000 / 60 / 60 % 24) == 1 ? '' : 's';
        result = `${Math.floor(difference / 1000 / 60 / 60 % 24)} hour${s} `;
      }
    }

    //it has days
    if ((difference % 1000 * 3600 * 60 * 24) > 0) {
      if (Math.floor(difference / 1000 / 60 / 60 / 24) > 0) {
        let s = Math.floor(difference / 1000 / 60 / 60 / 24) == 1 ? '' : 's';
        result = `${Math.floor(difference / 1000 / 60 / 60 / 24)} day${s} `;
      }

    }

    return result + 'ago';
  }

  toDateNumber(date: string): number {
    return Date.parse(date);
  }
}
