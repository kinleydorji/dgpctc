import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallconferencePage } from './overallconference.page';

describe('OverallconferencePage', () => {
  let component: OverallconferencePage;
  let fixture: ComponentFixture<OverallconferencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallconferencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallconferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
