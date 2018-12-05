import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPerformancComponent } from './agent-performance.component';

describe('TruckListComponent', () => {
  let component: AgentPerformancComponent;
  let fixture: ComponentFixture<AgentPerformancComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPerformancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPerformancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
