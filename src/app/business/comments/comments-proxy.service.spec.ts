import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommentsProxyService } from './comments-proxy.service';

describe('CommentsProxyService', () => {
  let service: CommentsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentsProxyService);
  //  httpMock = TestBed.inject(HttpClientTestingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});


// export constFAKE_POSTS = [{_id: '3423werwer', title:'cosmos',}]// metes loq eu te devuelve elservidor
