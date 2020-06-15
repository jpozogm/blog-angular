import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsCardComponent } from './comments-card.component';


describe('ComentsCardComponent', () => {
  let component: CommentsCardComponent;
  let fixture: ComponentFixture<CommentsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
