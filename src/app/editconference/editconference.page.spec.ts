import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditconferencePage } from './editconference.page';

describe('EditconferencePage', () => {
  let component: EditconferencePage;
  let fixture: ComponentFixture<EditconferencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditconferencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditconferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
