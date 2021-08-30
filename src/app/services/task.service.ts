import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const Task_API = 'http://localhost:8080/api/tasks/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  public getTasksForCurrentAccount(): Observable<any> {
    return this.http.get(Task_API);
  }

  public getSpecificTaskForCurrentAccount(taskId: number): Observable<any> {
    return this.http.get(Task_API + taskId);
  }
}
