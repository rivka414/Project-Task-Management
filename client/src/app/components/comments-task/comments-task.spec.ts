import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsTask } from './comments-task';

describe('CommentsTask', () => {
  let component: CommentsTask;
  let fixture: ComponentFixture<CommentsTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
