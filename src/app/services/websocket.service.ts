import {Injectable} from '@angular/core';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {TokenStorageService} from "./token-storage.service";
import {Message} from "../models/Message";
import {AccountService} from "./account.service";
import {Account} from "../models/Account";

const SERVER_URL = 'http://localhost:8080/ws';
const TOPIC = '/queue/reply/';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  stompClient: any;
  messages: any = [];
  currentAccount: Account;


  constructor(private tokenService: TokenStorageService,
              private accountService: AccountService) {
  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    let webSocket = new SockJS(SERVER_URL);
    this.stompClient = Stomp.over(webSocket);
    const _this = this;
    const token = this.tokenService.getToken();

    this.accountService.getCurrentAccount()
      .subscribe(data => {
        this.currentAccount = data;
      });

    _this.stompClient.connect({'Authorization': token}, function (frame) {
      _this.stompClient.subscribe(TOPIC + _this.currentAccount.login, (message) => {
        if (message.body) {
          console.log("getting massage");
          _this.messages.push(JSON.parse(message.body));
        }
      }, {'Authorization': token});
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _send(message: Message) {
    const token = this.tokenService.getToken();
    console.log("calling logout api via web socket");
    this.stompClient.send('/app/send/message/' + message.receiver, {'Authorization': token}, JSON.stringify(message));
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }
}
