import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostProxyService } from './post-proxy.service';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shouldverify get all posts request', () => {
    service.getPosts().subscribe(
      postDTO => expect(postDTO).toBe(FAKE_POSTS)
    );
    const request = httpMock.expectOne('http://localhost:3000/posts/');
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
    httpMock.verify(); // se podría meter en el beforeEach si tienes varios que lo usan
  });
});


// getPostByID
// saveNewPost
// updatePost
// deletePost

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

