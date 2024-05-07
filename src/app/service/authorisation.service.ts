import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthorisationService {

  authorisationType: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  tokenData: BehaviorSubject<string> = new BehaviorSubject<string>('');
  authorisationType$ = this.authorisationType.asObservable();
  tokenData$ = this.tokenData.asObservable();

  setDta(data: boolean) {
    this.authorisationType.next(data);
  }

  getData(): Observable<boolean> {
    return this.authorisationType$;
  }

  setToken(token: any) {
    sessionStorage.setItem('token', token);
    this.tokenData.next(token);
  }

  getToken(): Observable<any> {
    return this.tokenData$
  }

}
