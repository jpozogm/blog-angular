import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { PostProxyService } from './post-proxy.service';
import { PostDTO } from './type/postDTO';

describe('PostProxyService', () => {
  let service: PostProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify get all posts request', () => {
    service.getPosts().subscribe(
      postDTO => expect(postDTO).toBe(FAKE_POSTS)
    );
    const request = httpMock.expectOne('http://localhost:3000/posts/');
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
    // httpMock.verify(); pero como lo usan varios se mete en el afterEach()
  });

  it('should verify get posts by ID request', async (() => {
    service.getPostByID(FAKE_POSTS[0]._id).subscribe(
      (postDTO: PostDTO) => expect(postDTO[0]._id).toEqual(FAKE_POSTS[0]._id)
    );
    const request = httpMock.expectOne(`http://localhost:3000/posts/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
  }));

  it('should verify save new post request', async(() => {
    service.saveNewPost(FAKE_POSTS[0]).subscribe(
      (postDTO: PostDTO) => expect(postDTO[0]).toEqual(FAKE_POSTS[0])
    );
    const request = httpMock.expectOne(`http://localhost:3000/posts/`);
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_POSTS);
  }));

  it('should verify update post request', async(() => {
    service.updatePost(FAKE_POSTS[0]._id, FAKE_POSTS[0]).subscribe(
      (postDTO: PostDTO) => expect(postDTO[0]).toEqual(FAKE_POSTS[0])
    );
    const request = httpMock.expectOne(`http://localhost:3000/posts/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_POSTS);
  }));

  it('should verify delete post request', async(() => {
    service.deletePost(FAKE_POSTS[0]._id).subscribe(
      (postDTO: PostDTO) => {
        expect(postDTO[0].postTittle).toBe('Cosmos'),
        expect(postDTO[0]).not.toBe('null');
      }
    );
    const request = httpMock.expectOne(`http://localhost:3000/posts/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_POSTS);
  }));
});


export const FAKE_POSTS = [{
  postTittle: 'Cosmos',
  postComments: [],
  _id: '5eccc30c2b6599f89e7f46e8',
  postAuthorName: 'Sagan',
  postAuthorNickName: 'Sagan',
  postContent: 'La ciencia es más que un cuerpo de conocimiento',
  user: '5ea9c70508e5675fd09fad81',
  postDate: new Date()
}];

