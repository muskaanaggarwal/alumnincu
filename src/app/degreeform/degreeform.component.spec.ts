import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeformComponent } from './degreeform.component';

describe('DegreeformComponent', () => {
  let component: DegreeformComponent;
  let fixture: ComponentFixture<DegreeformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
