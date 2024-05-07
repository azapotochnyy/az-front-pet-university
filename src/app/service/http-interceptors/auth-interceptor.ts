import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = sessionStorage.getItem('token');
    console.log('in intercepter')
    console.log(req.method)
    if (token !== null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      console.log('in token area')
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

