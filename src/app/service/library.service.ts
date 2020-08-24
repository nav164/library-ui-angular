import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Book, Borrow } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  books: Book[] = [];

  constructor(private http: HttpClient,
    private zone: NgZone) { }

  /**
   * This method will make the http call to get all the books from backend
   * @returns List of books
   */
  getBooks(): Observable<Book> {
    return Observable.create(observer => {
      const eventSource = new EventSource(environment.root);
      eventSource.onmessage = event => {
        observer.next(JSON.parse(event.data));
      };
      eventSource.onerror = () => {
        if (eventSource.readyState !== eventSource.CONNECTING) {
          observer.error('An error occurred.');
        }
        eventSource.close();
        observer.complete();
      };
      return () => {
        eventSource.close();
      };
    });
  }

  /**
   * This method will make the http call to borrow the book
   * @param borrow borrow object containing the list of books and user id
   * @returns Array of books
   */
  borrowBook(borrow: Borrow):Observable<any> { 
    console.log(borrow)
    return this.http.put(environment.root, borrow);
  }

  /**
   * This method will make a http call to return the book
   * @param borrow borrow object containing the list of books and user id
   * @returns Array of books
   */
  returnBook(borrow: Borrow):Observable<any> {
    console.log(borrow)
    return this.http.put(`${environment.root}${environment.returnBook}`, borrow);
  }
}
