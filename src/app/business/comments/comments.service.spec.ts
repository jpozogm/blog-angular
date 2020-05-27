import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Comments } from 'src/app/back-office/back-office-comments/type/comment';
import { CommentsProxyService } from './comments-proxy.service';
import { FAKE_COMMENTS } from './comments-proxy.service.spec';
import { CommentService } from './comments.service';


describe('PostService', () => {
  let service: CommentService;
  let proxy: CommentsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentService);
    proxy = TestBed.inject(CommentsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

/*   it('should mapper dto to model: getCommentByID', async (() => {
    const spyProxy = spyOn(proxy, 'getCommentByID').and.returnValue(of(FAKE_COMMENTS[0]));
    service.getCommentByID(FAKE_COMMENTS[0]._id).subscribe(
     (comment: Comments) => {
       expect(comment.commentAuthorNickName).toEqual(FAKE_COMMENTS[0].commentAuthorNickName);
     }
    );
    expect(spyProxy).toHaveBeenCalled();
  })); */

  it('should mapper dto to model: saveNewComment', async (() => {
    const spyProxy = spyOn(proxy, 'saveNewComment').and.returnValue(of(FAKE_COMMENTS[0]));
    service.saveNewComment(FAKE_COMMENTS[0]._id, FAKE_COMMENTS[0]).subscribe(
     (comment: Comments) => {
       expect(comment.commentAuthorNickName).toEqual(FAKE_COMMENTS[0].commentAuthorNickName);
     }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));



});
