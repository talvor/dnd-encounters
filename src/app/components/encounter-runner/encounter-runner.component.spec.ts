import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterRunnerComponent } from './encounter-runner.component';

describe('EncounterRunnerComponent', () => {
  let component: EncounterRunnerComponent;
  let fixture: ComponentFixture<EncounterRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
