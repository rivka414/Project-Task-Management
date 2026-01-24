import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Using } from './using';

describe('Using', () => {
  let component: Using;
  let fixture: ComponentFixture<Using>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Using]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Using);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
