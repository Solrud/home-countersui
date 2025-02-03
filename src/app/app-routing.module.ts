import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {authGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
