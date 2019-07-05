import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalformComponent } from './personalform.component';

describe('PersonalformComponent', () => {
  let component: PersonalformComponent;
  let fixture: ComponentFixture<PersonalformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
