import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule, UserAuthenticated } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CampaignThumbnailComponent } from './campaign/campaign-thumbnail/campaign-thumbnail.component';
import { CampaignDetailsComponent } from './campaign/campaign-details/campaign-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CampaignCreateComponent } from './campaign/campaign-create/campaign-create.component';
import { CategoriesComponent } from './categories/categories.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignCommentComponent } from './campaign/campaign-comment/campaign-comment.component';
import { DataService } from './shared/data.service'
import { TokenService } from './shared/token.service'
import { bethechangeInterceptor, BeTheChangeInterceptor } from './interceptors/bethechange.interceptor'
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignEditComponent } from './campaign/campaign-edit/campaign-edit.component';
import { AuthService } from './shared/auth.service'
import { ToastrModule } from 'ngx-toastr'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    CampaignThumbnailComponent,
    CampaignDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CampaignCreateComponent,
    CategoriesComponent,
    CampaignComponent,
    CampaignCommentComponent,
    CampaignEditComponent,
    HelpComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataService,
    TokenService,
    AuthService,
    bethechangeInterceptor,
    UserAuthenticated
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
