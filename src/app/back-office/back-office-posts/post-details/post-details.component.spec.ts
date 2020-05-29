import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PostProxyService } from 'src/app/business/posts/post-proxy.service';
import { FAKE_POSTS } from 'src/app/business/posts/post-proxy.service.spec';
import { PostDetailsComponent } from './post-details.component';


describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let proxy: PostProxyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PostDetailsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailsComponent);
    proxy =  TestBed.inject(PostProxyService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deletePost post', async (() => {
    const spyProxy = spyOn(proxy, 'deletePost').and.returnValue(of(FAKE_POSTS[0]));
    component.deletePost();
    component.deletePostSub.remove(
      posts => {
        expect(posts[0]._id).toEqual(FAKE_POSTS[0]._id);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));

});
