import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FAQComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MoodComponent } from './components/mood/mood.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MoodformComponent } from './components/moodform/moodform.component';
import { SearchFunctionComponent } from './search-function/search-function.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: SearchComponent, pathMatch: 'full' },
  { path: 'mood', component: MoodComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'moodform', component: MoodformComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
