import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CampaignCreateComponent } from './campaign/campaign-create/campaign-create.component'
import { CategoriesComponent } from './categories/categories.component'
import { ProfileComponent } from './profile/profile.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignDetailsComponent } from './campaign/campaign-details/campaign-details.component';
import { CampaignEditComponent } from './campaign/campaign-edit/campaign-edit.component';
import { AuthService } from './shared/auth.service';
import { HelpComponent } from './help/help.component';


@Injectable()
export class UserAuthenticated implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate() {
    if(!this.authService.checkUserLoggedIn()) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}


const routes: Routes = [
  { path: 'home/:category', component: CampaignComponent },
  { path: 'categories', component:  CategoriesComponent},
  { path: 'categories/:id', component:  CampaignComponent},
  { path: 'campaign/new', component: CampaignCreateComponent, canActivate: [UserAuthenticated] },
  { path: 'campaign/:id', component: CampaignDetailsComponent },
  { path: 'campaign/:id/edit', component: CampaignEditComponent, canActivate: [UserAuthenticated] },
  { path: 'profile/:email', component: ProfileComponent, canActivate: [UserAuthenticated] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home/all' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
