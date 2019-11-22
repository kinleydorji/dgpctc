import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferencetabsPage } from './conferencetabs.page';

describe('ConferencetabsPage', () => {
  let component: ConferencetabsPage;
  let fixture: ComponentFixture<ConferencetabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferencetabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferencetabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
