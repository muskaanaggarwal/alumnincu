import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Job2formComponent } from './job2form.component';

describe('Job2formComponent', () => {
  let component: Job2formComponent;
  let fixture: ComponentFixture<Job2formComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Job2formComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Job2formComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
