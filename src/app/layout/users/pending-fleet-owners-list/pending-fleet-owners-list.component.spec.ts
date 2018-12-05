import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFleetOwnersListComponent } from './pending-fleet-owners-list.component';

describe('PendingFleetOwnersListComponent', () => {
  let component: PendingFleetOwnersListComponent;
  let fixture: ComponentFixture<PendingFleetOwnersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingFleetOwnersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingFleetOwnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
