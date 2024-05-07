import {Component, OnInit} from '@angular/core';
import {AuthorisationService} from "../../service/authorisation.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  token: string | null = '';

  constructor(private authorisationService: AuthorisationService, private router: Router) {
  }

  authorisationType(data: boolean): void {
    this.authorisationService.setDta(data);
    this.router.navigate([''])

  }

  logOut(): void {
    this.authorisationService.setToken(null);
    sessionStorage.removeItem('token');
    this.router.navigate([''])
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("token") !== null) {
      this.token = sessionStorage.getItem("token");
    }
    this.authorisationService.getToken().subscribe(data => {
      if (data === null || data !== '') {
        this.token = data;
      }
      if (sessionStorage.getItem("token") === null || sessionStorage.getItem("token") === undefined
        || sessionStorage.getItem("token") === '') {
        this.token = data;
      }
    })
  }

}
