import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BackOfficeProxyService } from './back-office-proxy.service';

describe('BackOfficeproxyService', () => {
  let service: BackOfficeProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BackOfficeProxyService);
  //  httpMock = TestBed.inject(HttpClientTestingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shouldverify get all posts request', () => {
    service.getPosts().subscribe();
  });
});


// export constFAKE_POSTS = [{_id: '3423werwer', title:'cosmos',}]// metes loq eu te devuelve elservidor
