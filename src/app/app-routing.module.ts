import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
