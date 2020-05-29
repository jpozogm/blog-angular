import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { CommentsProxyService } from './comments-proxy.service';
import { CommentDTO } from './type/commentDTO';

describe('CommentsProxyService', () => {
  let service: CommentsProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentsProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify get comment by ID request', async (() => {
    service.getCommentByID(FAKE_COMMENTS[0]._id).subscribe(
      (commentDTO: CommentDTO) => expect(commentDTO[0]._id).toEqual(FAKE_COMMENTS[0]._id)
    );
    const request = httpMock.expectOne(`http://localhost:3000/comments/${FAKE_COMMENTS[0]._id}`);
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_COMMENTS);
  }));

  it('should verify save new comment request', async(() => {
    service.saveNewComment(FAKE_COMMENTS[0]._id, FAKE_COMMENTS[0]).subscribe(
      (commentDTO: CommentDTO) => expect(commentDTO[0]).toEqual(FAKE_COMMENTS[0])
    );
    const request = httpMock.expectOne(`http://localhost:3000/comments/${FAKE_COMMENTS[0]._id}`);
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_COMMENTS);
  }));

  it('should verify update comment request', async(() => {
    service.updateComment(FAKE_COMMENTS[0]._id, FAKE_COMMENTS[0]).subscribe(
      (commentDTO: CommentDTO) => expect(commentDTO[0]).toEqual(FAKE_COMMENTS[0])
    );
    const request = httpMock.expectOne(`http://localhost:3000/comments/${FAKE_COMMENTS[0]._id}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_COMMENTS);
  }));

  it('should verify delete comment request', async(() => {
    service.deleteComment(FAKE_COMMENTS[0]._id).subscribe(
      (commentDTO: CommentDTO) => {
        expect(commentDTO[0].commentAuthorNickName).toBe('M.Rajoy'),
        expect(commentDTO[0]).not.toBe('null');
      }
    );
    const request = httpMock.expectOne(`http://localhost:3000/comments/${FAKE_COMMENTS[0]._id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_COMMENTS);
  }));

});


export const FAKE_COMMENTS = [{
  commentAuthorNickName: 'M.Rajoy',
  commentContent: 'Rajoy',
  _id: '5ec50e7de16fefce53367992',
  commentsPostId: '5ec50ddbe16fefce5336798f',
  userId: '5ec50ddsdbe16fefce5336798f'
}];
