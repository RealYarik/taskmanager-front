import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {TaskService} from "../services/task.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskGuardService implements CanActivate {

  constructor(private router: Router,
              private taskService: TaskService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.taskService.getSpecificTask(route.params.id).pipe(
      map(data => {
        return true;
      }),
      catchError(err => {
        this.router.navigate(['tasks']);
        return of(false);
      })
    );
  }
}
