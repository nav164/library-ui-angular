import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { DemoMaterialModule } from 'src/app/material-module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { BorrowDialogComponent } from '../dialog/borrow-dialog/borrow-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: LibraryComponent}
];

@NgModule({
  declarations: [LibraryComponent, BorrowDialogComponent],
  entryComponents: [BorrowDialogComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class LibraryModule { }
