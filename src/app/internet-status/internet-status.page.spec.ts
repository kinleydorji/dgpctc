import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetStatusPage } from './internet-status.page';

describe('InternetStatusPage', () => {
  let component: InternetStatusPage;
  let fixture: ComponentFixture<InternetStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
