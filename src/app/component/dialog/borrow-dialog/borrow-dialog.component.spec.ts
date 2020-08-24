import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowDialogComponent } from './borrow-dialog.component';

describe('BorrowDialogComponent', () => {
  let component: BorrowDialogComponent;
  let fixture: ComponentFixture<BorrowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
