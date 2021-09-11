import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebsocketService} from "../../../services/websocket.service";
import {Message} from "../../../models/Message";
import {TokenStorageService} from "../../../services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {Account} from "../../../models/Account";
import {MessageService} from "../../../services/message.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private scrollContainer: ElementRef;


  webSocketService: WebsocketService;
  message: Message;
  input: string = '';
  receiverLogin: string;
  currentAccount: Account;
  isDataLoaded = false;
  isLoggedIn = false;
  messagesData: any;
  messagesForCurrentChat: Message[];

  constructor(private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private messageService: MessageService,
              private datePipe: DatePipe,
              private router: Router) {
    this.receiverLogin = <string>this.route.snapshot.paramMap.get('login');
    this.accountService.getCurrentAccount()
      .subscribe(data => {
        this.currentAccount = data;
        this.isLoggedIn = true;
      });

  }

  ngOnInit(): void {
    this.webSocketService = new WebsocketService(this.tokenService, this.accountService);
    this.messageService.getMessagesForCurrentAccountWithSpecificPenfriend()
      .subscribe(data => {
        this.messagesData = data;
        this.accountService.getCurrentAccount().subscribe(dataAcc => {
          this.currentAccount = dataAcc;
          this.isDataLoaded = true;
        });
        if (this.messagesData[this.receiverLogin] == undefined) {
          this.messagesForCurrentChat = [];
        } else {
          this.messagesForCurrentChat = this.messagesData[this.receiverLogin];
        }
      });
    this.webSocketService._connect();
    this.scrollToBottom();
  }


  ngOnDestroy() {
    this.webSocketService._disconnect();
  }

  sendMessage() {
    this.message = {
      text: this.input,
      owner: this.currentAccount.login,
      receiver: this.receiverLogin,
      sendDate: <string>this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }
    this.webSocketService._send(this.message);

    if (this.messagesForCurrentChat == undefined) {
      this.messagesForCurrentChat = [];
    }
    this.messagesForCurrentChat.push(this.message);
    this.input = '';
  }

  sortBy(array: Message[]): Message[] {
    return array.sort((a, b) => {
      return Date.parse(<string>a.sendDate) - Date.parse(<string>b.sendDate);
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  toDate(stringDate: string): Date {
    return new Date(stringDate);
  }

  refToMessages() {
    this.router.navigate(['messages']);
  }

  getMonth(numberOfMonth): string {
    const shortedMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return shortedMonthNames[numberOfMonth];
  }

}
