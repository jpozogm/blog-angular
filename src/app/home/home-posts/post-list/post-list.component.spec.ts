import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PostProxyService } from 'src/app/business/posts/post-proxy.service';
import { FAKE_POSTS } from 'src/app/business/posts/post-proxy.service.spec';
import { PostListComponent } from './post-list.component';


describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let proxy: PostProxyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PostListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    proxy =  TestBed.inject(PostProxyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set post', async (() => {
    const spyProxy = spyOn(proxy, 'getPosts').and.returnValue(of(FAKE_POSTS));
    component.ngOnInit();
    component.publicPosts$.subscribe(
      posts => {
        expect(posts[0]._id).toEqual(FAKE_POSTS[0]._id);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
});
