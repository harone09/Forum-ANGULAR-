import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './Components/account/account.component';
import { PublicationsComponent } from './Components/publications/publications.component';
import { ClassesComponent } from './Components/classes/classes.component';
import { LoginComponent } from './Components/login/login.component';


const routes: Routes = [
  // { path: '', redirectTo: '/Publications/0', pathMatch: 'full' },
  { path: 'Publications/:id', component: PublicationsComponent },
  { path: 'Profile', component: AccountComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Classes', component: ClassesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
