import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Editjob2Component } from './editjob2.component';

describe('Editjob2Component', () => {
  let component: Editjob2Component;
  let fixture: ComponentFixture<Editjob2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Editjob2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Editjob2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
