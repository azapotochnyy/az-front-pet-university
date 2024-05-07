import {Component, OnInit} from "@angular/core";
import {AuthorisationService} from "../../service/authorisation.service";

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrl: './authorisation.component.css'
})
export class AuthorisationComponent implements OnInit {
  token: string | null = '';

  constructor(private authorisationService: AuthorisationService) {
  }

  signIn = false;

  choseAuthorisation(state: boolean): void {
    this.authorisationService.setDta(state);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("token") !== null) {
      this.token = sessionStorage.getItem("token");
    }
    this.authorisationService.getToken().subscribe(data => {
      if (data === null || data!=='') {
        this.token = data;
      }
      if (sessionStorage.getItem("token") === null || sessionStorage.getItem("token") === undefined
        || sessionStorage.getItem("token") === '') {
        this.token = data;
      }
    })
    this.authorisationService.getData().subscribe(data => {
      this.signIn = data;
    })
    this.signIn = false;
  }

}
