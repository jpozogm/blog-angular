import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostProxyService } from './post-proxy.service';
import { PostService } from './post.service';


describe('PostService', () => {
  let service: PostService;
  let proxy: PostProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
    proxy = TestBed.inject(PostProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mapper dto to model', () => {
   const spyProxy = spyOn(proxy, 'getPosts');
  });
});
