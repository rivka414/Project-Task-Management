import { TestBed } from '@angular/core/testing';
import { CommentsTask } from '../../components/comments-task/comments-task';



describe('CommentsTask', () => {
  let service: CommentsTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
