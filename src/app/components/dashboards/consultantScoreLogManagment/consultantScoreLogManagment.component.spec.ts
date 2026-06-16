/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultantScoreLogManagmentComponent } from './consultantScoreLogManagment.component';

describe('ConsultantScoreLogManagmentComponent', () => {
  let component: ConsultantScoreLogManagmentComponent;
  let fixture: ComponentFixture<ConsultantScoreLogManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantScoreLogManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantScoreLogManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
