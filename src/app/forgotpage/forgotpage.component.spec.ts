import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpageComponent } from './forgotpage.component';

describe('ForgotpageComponent', () => {
  let component: ForgotpageComponent;
  let fixture: ComponentFixture<ForgotpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
