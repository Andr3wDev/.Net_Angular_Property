import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, concatMap, retry, retryWhen } from "rxjs/operators";
import { ErrorCode } from "src/enums/enums";
import { AlertifyService } from "./alertify.service";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{
  constructor(private alertify: AlertifyService){}

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retryWhen(error => this.retryRequest(error, 10)),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.setError(error);
          this.alertify.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }

  // Retry the request in case of error
  retryRequest(error: Observable<unknown>, retryCount: number) : Observable<unknown> {
      return error.pipe(
          concatMap((checkErr: HttpErrorResponse, count: number) => {

              // Errors such as API not accessible
              if(count <= retryCount)
              {
                switch(checkErr.status){
                  case ErrorCode.serverDown:
                    return of(checkErr);
                    // case ErrorCode.unauthorised:
                    // return of(checkErr);
                }
              }
              return throwError(checkErr);
          })
      )
  }

  // Returns string type
  setError(error: HttpErrorResponse): string {
    let errorMessage = "Unknown error occured";
    if(error.error instanceof ErrorEvent){
      // client side error
      errorMessage = error.error.message;
    }
    else{
      // server side error
      if(error.status === 401){
        return error.error.errorMessage;
      }

      if(error.error.errorMessage && error.status !== 0)
      {
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
