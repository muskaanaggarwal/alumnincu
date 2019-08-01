import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdegreeComponent } from './editdegree.component';

describe('EditdegreeComponent', () => {
  let component: EditdegreeComponent;
  let fixture: ComponentFixture<EditdegreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdegreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
