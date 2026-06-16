/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultantAttendanceManagmentComponent } from './consultantAttendanceManagment.component';

describe('ConsultantAttendanceManagmentComponent', () => {
  let component: ConsultantAttendanceManagmentComponent;
  let fixture: ComponentFixture<ConsultantAttendanceManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantAttendanceManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantAttendanceManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
