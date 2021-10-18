import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//const routes: Routes = [];

const routes: Routes = [
  {
    path: '', loadChildren: () => import('@lab/lab.module').then(m => m.LabModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
