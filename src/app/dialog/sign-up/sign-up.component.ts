import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthorisationApiService} from "../../service/authorisation-api.service";
import {AuthorisationService} from "../../service/authorisation.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {

  constructor(private authorisationService: AuthorisationService, private authorisationApiService: AuthorisationApiService) {
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  lastName = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  passwordConfirm = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  baseUrl = "http://localhost:8080"
  userRole = "ROLE_USER"

  ngOnInit(): void {
  }

  sendRequest() {
    if (this.name.invalid || this.lastName.invalid || this.emailFormControl.invalid || this.password.invalid ||
      this.passwordConfirm.invalid || (this.password.value !== this.passwordConfirm.value)) {
      return;
    } else {
      const body = this.createBody();
      this.authorisationApiService.setBaseUrl(this.baseUrl);
      this.authorisationApiService.post('/auth/addNewUser', body).subscribe(data => {
        console.log('data')
        this.authorisationService.setDta(true);
      }, error => {
        console.log('error')
        console.log(error)
      })
    }
  }

  createBody() {
    return {
      name: this.emailFormControl.value,
      userName: this.name.value,
      userSurName: this.lastName.value,
      email: this.emailFormControl.value,
      password: this.password.value,
      roles: this.userRole
    }
  }
}
