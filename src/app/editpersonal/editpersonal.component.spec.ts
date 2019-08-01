import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpersonalComponent } from './editpersonal.component';

describe('EditpersonalComponent', () => {
  let component: EditpersonalComponent;
  let fixture: ComponentFixture<EditpersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
