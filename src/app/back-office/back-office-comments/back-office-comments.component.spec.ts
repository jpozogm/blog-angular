import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCommentsComponent } from './back-office-comments.component';

describe('BackOfficeCommentsComponent', () => {
  let component: BackOfficeCommentsComponent;
  let fixture: ComponentFixture<BackOfficeCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
