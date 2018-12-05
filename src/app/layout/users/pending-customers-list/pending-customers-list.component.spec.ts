import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCustomersListComponent } from './pending-customers-list.component';

describe('PendingCustomersListComponent', () => {
  let component: PendingCustomersListComponent;
  let fixture: ComponentFixture<PendingCustomersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingCustomersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
