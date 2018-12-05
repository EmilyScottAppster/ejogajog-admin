import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCompanyDetailsComponent } from './pending-company-details.component';

describe('PendingCompanyDetailsComponent', () => {
  let component: PendingCompanyDetailsComponent;
  let fixture: ComponentFixture<PendingCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingCompanyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
