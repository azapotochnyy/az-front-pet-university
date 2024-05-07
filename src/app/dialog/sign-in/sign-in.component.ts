import {Component} from "@angular/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthorisationApiService} from "../../service/authorisation-api.service";
import {AuthorisationService} from "../../service/authorisation.service";
import {ProfileApiService} from "../../service/profile-api.service";
import {Router} from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private authorisationApiService: AuthorisationApiService,
              private authorisationService:AuthorisationService,
              private profileApiService: ProfileApiService, private router: Router) {
  }

  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  baseUrl = "http://localhost:8080"

  sendRequest() {
    if (this.name.invalid || this.password.invalid) {
      return
    } else {
      const body = this.createBody();
      this.authorisationApiService.setBaseUrl(this.baseUrl);
      this.authorisationApiService.post('/auth/generateToken', body).subscribe(data => {
        sessionStorage.setItem('token', data.response);
        this.authorisationService.setToken(data.response);
        this.router.navigate(['/profile']);
      }, error => {
        console.log('error')
      })
    }
  }

  createBody() {
    return {
      username: this.name.value,
      password: this.password.value,
    }
  }
}
