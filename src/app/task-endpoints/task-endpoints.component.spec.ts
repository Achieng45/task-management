import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEndpointsComponent } from './task-endpoints.component';

describe('TaskEndpointsComponent', () => {
  let component: TaskEndpointsComponent;
  let fixture: ComponentFixture<TaskEndpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEndpointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
