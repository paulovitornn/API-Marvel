import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: 'heroes', component: HeroesComponent,
    canActivate:[AuthGuard]
  },
  { path: '', redirectTo: 'heroes', pathMatch: 'full'},
  { path: '**', redirectTo: 'heroes', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
