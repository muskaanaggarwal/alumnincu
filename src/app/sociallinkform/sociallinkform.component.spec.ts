import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SociallinkformComponent } from './sociallinkform.component';

describe('SociallinkformComponent', () => {
  let component: SociallinkformComponent;
  let fixture: ComponentFixture<SociallinkformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SociallinkformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SociallinkformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
