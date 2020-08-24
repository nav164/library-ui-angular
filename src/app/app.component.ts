import { Component, OnInit } from '@angular/core';
import { LibraryService } from './service/library.service';
import { Book } from './model/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'library-management';
  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.getBooks().subscribe(data => {
      this.libraryService.books.push(data);
    },
    err => {
      console.log(err);
    });  
  }
}
