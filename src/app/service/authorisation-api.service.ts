import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({providedIn: 'root'},)
export class AuthorisationApiService {

  constructor(private http: HttpClient) {
  }

  baseUrl: string = '';

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    )
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  get(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url, this.httpOptions);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(this.baseUrl + url, body, this.httpOptions);
  }

}
