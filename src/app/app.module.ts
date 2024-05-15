import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app.component';
import {IndexPageComponent} from "./components/index/index-page.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {SignUpComponent} from "./dialog/sign-up/sign-up.component";
import {AuthorisationComponent} from "./dialog/authorisation/authorisation.component";
import {SignInComponent} from "./dialog/sign-in/sign-in.component";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./service/http-interceptors/auth-interceptor";
import {ProfileComponent} from "./components/profile/profile.component";
import {AppRoutingModule} from "./app.routing.module";
import {NotesComponent} from "./components/notes/notes.component";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

@NgModule({
  declarations: [IndexPageComponent, AppComponent, NavigationComponent, AuthorisationComponent, SignUpComponent,
    SignInComponent, ProfileComponent, NotesComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, FormsModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, HttpClientModule, AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideAnimationsAsync(),
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => (getFirestore()))
  ]
})
export class AppModule {
}
