import { TestBed } from '@angular/core/testing';

import { HandleHttpResponseService } from './handle-http-response.service';

describe('HandleHttpResponseService', () => {
  let service: HandleHttpResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleHttpResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
