import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/Message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  messagesData: any;
  messagesMap: [
    name: string,
    message: Message[]
  ][];

  constructor(private tokenService: TokenStorageService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      this.messageService.getMessagesForCurrentAccountWithSpecificPenfriend()
        .subscribe(data => {
          this.messagesData = data;
          this.isDataLoaded = true;
          this.messagesMap = Object.entries(this.messagesData);
        });
    }
  }

  // convertAnyToMessage(value: any[]): Message[] {
  //   for (let i = 0; i < value.length; i++) {
  //     value[i] = value[i] as Message;
  //   }
  //   return value;
  // }
  //

}
