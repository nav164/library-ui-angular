import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Book, Borrow } from 'src/app/model/book';

export interface DialogData {
  userId: string;
  book: Book[];
}

@Component({
  selector: 'app-borrow-dialog',
  templateUrl: './borrow-dialog.component.html',
  styleUrls: ['./borrow-dialog.component.scss']
})
export class BorrowDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<BorrowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Borrow) {}
  
    ngOnInit(): void {  }

  onNoClick(): void {
    this.dialogRef.close('cancel');
  }

}
