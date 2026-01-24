import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTasks } from './show-tasks';

describe('ShowTasks', () => {
  let component: ShowTasks;
  let fixture: ComponentFixture<ShowTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
