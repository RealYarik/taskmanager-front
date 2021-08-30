import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const MESSAGE_API = 'http://localhost:8080/api/messages/';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  public getMessagesForCurrentAccountWithSpecificPenfriend(): Observable<any> {
    return this.http.get(MESSAGE_API);
  }

}
