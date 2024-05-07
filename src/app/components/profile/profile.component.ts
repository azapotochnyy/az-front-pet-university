import {Component, OnInit} from '@angular/core';
import {ProfileApiService} from "../../service/profile-api.service";
import {ProfileModel} from "../../model/profile.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  data: ProfileModel | null = null;
  baseUrl = "http://localhost:8080";

  constructor(private profileApiService: ProfileApiService) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profileApiService.setBaseUrl(this.baseUrl);
    this.profileApiService.get('/auth/user/userProfile').subscribe(data => {
      console.log('data received');
      console.log(data);
      this.data = data;
    });
  }
}
