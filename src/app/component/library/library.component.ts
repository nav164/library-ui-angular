import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../service/library.service';
import { Book, User, Borrow } from 'src/app/model/book';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { BorrowDialogComponent } from '../dialog/borrow-dialog/borrow-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  books: Book[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dataSource = new MatTableDataSource<Book>();
  selection = new SelectionModel<Book>(true, []);
  displayedColumns: string[] = ['select', 'position', 'isbn', 'name', 'author', 'price', 'isAvailable','userId','userName']; 
  
  constructor(private libraryService: LibraryService, 
      public dialog: MatDialog,
      private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.transformData(this.libraryService.books);
  }

 /**
  * This method will transform the book data to show in the table
  * @author Naveen
  * @param books list of books
  */
 transformData(books: Book[]) {
    let i: number = 1;
    books.forEach(book => {
      book.position = i;
      i++;
    });
    this.dataSource = new MatTableDataSource<Book>(books);
    console.log(this.dataSource)
  }  

  /**
   *  Whether the number of selected elements matches the total number of rows. 
   * @author Naveen
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRowsMinusExcluded = this.dataSource.data
    .filter(row => row.isAvailable)
    .length;
    return numSelected === numRowsMinusExcluded;
  }

  /** 
   * Selects all rows if they are not all selected; otherwise clear selection. 
   * @author Naveen
   */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row =>{ 
          if (row.isAvailable) {
            this.selection.select(row)
          }
        });
  }

  /** 
   * The label for the checkbox on the passed row 
   * @author Naveen
   */
  checkboxLabel(row?: Book): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /**
   * This method will make a service call to borrow book
   * @author Naveen
   */
  borrowBook() {
    let book: Book[] = [];
    let borrow: Borrow = new Borrow();
    if(this.validateBorrowRequest()) {
      borrow.userId = 1;
      this.selection.selected.forEach(row => {
        book.push(row);
      });
      borrow.book = book;
      const dialogRef = this.dialog.open(BorrowDialogComponent, {
        width: '500px',
        data: borrow
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != 'cancel') {
          this.libraryService.borrowBook(borrow).subscribe((books:Book[]) => {
            this.transformData(books);
            this.selection = new SelectionModel<Book>(true, []);
          },
          (err : HttpErrorResponse) => {
            this.openSnackBar(err.error.message);
          });
        }
      });
    }
  }

  /**
   * This method will return borrowed book
   * @author Naveen
   */
  returnBook() {
    let book: Book[] = [];
    let borrow: Borrow = new Borrow();
    if(this.validateReturnRequest()) {
      this.selection.selected.forEach(row => {
        book.push(row);
      });
      borrow.userId = +book[0].user.userId;
      borrow.book = book;
      this.libraryService.returnBook(borrow).subscribe((books:Book[]) => {
        this.transformData(books);
        this.selection = new SelectionModel<Book>(true, []);
      },
      (err : HttpErrorResponse) => {
        this.openSnackBar(err.error.message);
      });
    }
  }

  /**
   * This method will validate the list of books to return
   * @author Naveen
   * @returns boolean value
   */
  validateReturnRequest(): boolean {
    let userId: number = -1;
    for(let i=0; i<this.selection.selected.length; i++) {
      if(userId === -1) {
        userId = +this.selection.selected[i].user.userId;
      } else {
        if(userId !== +this.selection.selected[i].user.userId) {
          this.openSnackBar('At a time only one user can return the books');
          return false;
        }
      }
    }
    return true;
  }

  /**
   * This method will validate the list of books to borrow
   * @author Naveen
   * @returns boolean value
   */
  validateBorrowRequest(): boolean {
    let i: number = 0;
    this.selection.selected.forEach(row => {
      if(!row.isAvailable) {
        i++;
      }
    });
    if(i > 0) {
      this.openSnackBar('Cannot borrow the already borrowed book');
      return false;
    }
    return true;
  }

  /**
   * This method will open the snackbar in the event of error
   * @param errorMessage error message
   */
  openSnackBar(errorMessage: string) {
    this._snackBar.open(errorMessage, 'Hide', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
