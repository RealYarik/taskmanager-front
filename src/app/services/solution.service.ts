import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/Task";
import {Solution} from "../models/Solution";

const Task_API = 'http://localhost:8080/api/tasks/';
const SOL_API = '/solutions';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http: HttpClient) {
  }

  public getSolutionsBySpecificTaskId(taskId: number): Observable<any> {
    return this.http.get(Task_API + taskId + SOL_API);
  }

  public getBooleanMapOfSolutions(taskId: number): Observable<any> {
    return this.http.get(Task_API + taskId + SOL_API + '/map');
  }

  public createSolution(taskId: number, solution: Solution): Observable<any> {
    return this.http.post(Task_API + taskId + SOL_API, {
      code: solution.code,
      taskId: solution.taskId
    });
  }
}
