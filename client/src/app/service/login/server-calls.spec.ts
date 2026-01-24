import { TestBed } from '@angular/core/testing';

import { ServerCalls } from './server-calls';

describe('ServerCalls', () => {
  let service: ServerCalls;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerCalls);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
