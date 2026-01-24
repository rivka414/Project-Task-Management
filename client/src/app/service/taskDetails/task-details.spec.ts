import { TestBed } from '@angular/core/testing';

import { TaskDetails } from '../task-details';

describe('TaskDetails', () => {
  let service: TaskDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
