import {Component, OnInit} from '@angular/core';
import {AuthorisationService} from "./service/authorisation.service";
import {ProfileApiService} from "./service/profile-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // token: string | null = '';
  // baseUrl = "http://localhost:8080"

  constructor(private authorisationService: AuthorisationService, private profileApiService: ProfileApiService) {
  }

  ngOnInit(): void {
  //   if (sessionStorage.getItem("token") !== null) {
  //     this.token = sessionStorage.getItem("token");
  //   }
  //   this.authorisationService.getToken().subscribe(data => {
  //     if (data === null || data!=='') {
  //       this.token = data;
  //     }
  //     if (sessionStorage.getItem("token") === null || sessionStorage.getItem("token") === undefined
  //       || sessionStorage.getItem("token") === '') {
  //       this.token = data;
  //     }
  //   })
  }

}
