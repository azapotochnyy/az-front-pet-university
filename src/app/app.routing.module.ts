import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthorisationComponent} from "./dialog/authorisation/authorisation.component";

const routes: Routes = [
  {path: '', component: AuthorisationComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
