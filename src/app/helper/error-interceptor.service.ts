import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {TokenStorageService} from "../services/token-storage.service";
import {NotificationService} from "../services/notification.service";
import {catchError} from "rxjs/operators";

@Injectable()

export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService,
              private notificationService: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      // if (err.status == 401) {
      //   this.tokenService.logout();
      //   window.location.reload();
      // }

      const error = err.error.message || err.statusText;
      this.notificationService.showSnackBar(error);
      return throwError(error);
    }));
  }
}

export const authErrorInterceptorProvider = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
]
