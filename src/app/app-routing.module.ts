import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {AuthComponent} from "./pages/auth/auth.component";

const routes: Routes = [
  {
    path: '',
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
