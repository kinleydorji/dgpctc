import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastvotePage } from './castvote.page';

describe('CastvotePage', () => {
  let component: CastvotePage;
  let fixture: ComponentFixture<CastvotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastvotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastvotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
