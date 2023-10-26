import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { SpinnerService } from '../services/spinner.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService, private auth:AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show()
    let intReq = req;
    const token = this.auth.getToken()

    if (token != null) {
      intReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(intReq).pipe(
      catchError((error: any) => {
        Swal.fire({
          title:"Error inesperado",
          text:"Desea ver los detalles del error?",
          icon:'error',
            confirmButtonText: 'Ver error',
            showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(error.message, '', 'info')
          }
      })
        return throwError(() => error);
      }),
      finalize(()=>this.spinnerService.hide()),
    )
  }
}
export const interceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true,
  },
];
