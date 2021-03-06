import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { 

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.auth.getToken()).pipe(
      switchMap((token, index) => {
        let headers = req.headers
          .set('Authorization', `Bearer ${token}`);     // Attach JWT

        //With the Object Type FormData the Content-Type has to be set automatically by the System to multipart/form-data
        if(!(req.body instanceof FormData)){
          headers = headers.append('Content-Type', "application/json");
          headers = headers.append('Access-Control-Allow-Origin', '*');
        }

        const newReq = req.clone({
          headers,
          //url: req.url.replace('http://', 'https://')       // Not required if environment variables has been set accordingly
        });

        return next.handle(newReq);
      })
    )
  }
}
