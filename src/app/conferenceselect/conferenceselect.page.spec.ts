import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceselectPage } from './conferenceselect.page';

describe('ConferenceselectPage', () => {
  let component: ConferenceselectPage;
  let fixture: ComponentFixture<ConferenceselectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceselectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceselectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
