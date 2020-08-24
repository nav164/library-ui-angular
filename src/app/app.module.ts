import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryComponent } from './component/library/library.component';
import { HeaderComponent } from './component/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LibraryService } from './service/library.service';
import { BorrowDialogComponent } from './component/dialog/borrow-dialog/borrow-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    LibraryService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
