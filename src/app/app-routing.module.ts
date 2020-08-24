import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './component/library/library.component';

const routes: Routes = [
  { path: 'bookdetails', loadChildren: () => import('./component/library/library.module').then(m => m.LibraryModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
