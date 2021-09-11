import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/Task";

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

  public getSpecificTask(taskId: number): Observable<any> {
    return this.http.get(Task_API + taskId);
  }

  public createTask(task: Task): Observable<any> {
    return this.http.post(Task_API, {
      name: task.name,
      description: task.description,
      executor: task.executor
    });
  }
}
