import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IddashboardComponent } from './iddashboard.component';

describe('IddashboardComponent', () => {
  let component: IddashboardComponent;
  let fixture: ComponentFixture<IddashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IddashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IddashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
