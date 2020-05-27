import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostProxyService } from './post-proxy.service';
import { FAKE_POSTS } from './post-proxy.service.spec';
import { PostService } from './post.service';
import { Post } from './type/post';


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

  it('should mapper dto to model: getPosts', async ( () => {
   const spyProxy = spyOn(proxy, 'getPosts').and.returnValue(of(FAKE_POSTS));
   service.getPosts().subscribe(
    (posts: Post[]) => {
      expect(posts[0]._id).toEqual(FAKE_POSTS[0]._id);
      expect(posts[0].postAuthorName).toEqual(FAKE_POSTS[0].postAuthorName);
      expect(posts[0].postContent).toEqual(FAKE_POSTS[0].postContent);
    }
   );
   expect(spyProxy).toHaveBeenCalled();
  }));


  it('should mapper dto to model: getPostByID', async (() => {
    const spyProxy = spyOn(proxy, 'getPostByID').and.returnValue(of(FAKE_POSTS[0]));
    service.getPostByID(FAKE_POSTS[0]._id).subscribe(
     (post: Post) => {
       expect(post.postAuthorName).toEqual(FAKE_POSTS[0].postAuthorName);
     }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));


  it('should mapper dto to model: saveNewPost', async (() => {
    const spyProxy = spyOn(proxy, 'saveNewPost').and.returnValue(of(FAKE_POSTS[0]));
    service.saveNewPost(FAKE_POSTS[0]).subscribe(
     (post: Post) => {
       expect(post.postAuthorName).toEqual(FAKE_POSTS[0].postAuthorName);
     }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));

  it('should mapper dto to model: updatePost', async (() => {
    const spyProxy = spyOn(proxy, 'updatePost').and.returnValue(of(FAKE_POSTS[0]));
    service.updatePost(FAKE_POSTS[0]._id, FAKE_POSTS[0].postAuthorName = 'pepito').subscribe(
     (post: Post) => {
       expect(post.postAuthorName).toEqual(FAKE_POSTS[0].postAuthorName);
     }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));

  it('should mapper dto to model: deletePost', async (() => {
    const spyProxy = spyOn(proxy, 'deletePost').and.returnValue(of(FAKE_POSTS[0]));
    service.deletePost(FAKE_POSTS[0]._id).subscribe(
     (post: Post) => {
       expect(post.postAuthorName).toEqual(FAKE_POSTS[0].postAuthorName),
       expect(post.postTittle).toBe('Cosmos');
     }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));

});
