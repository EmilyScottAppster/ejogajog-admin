import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordUsersListComponent } from './reset-password-users-list.component';

describe('ResetPasswordUsersListComponent', () => {
  let component: ResetPasswordUsersListComponent;
  let fixture: ComponentFixture<ResetPasswordUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
