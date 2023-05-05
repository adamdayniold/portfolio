import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DescriptionComponent } from './modules/description/description.component';

const appRoutes: Routes = [
  { path: '', component: DescriptionComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static forRoot: any;
}
