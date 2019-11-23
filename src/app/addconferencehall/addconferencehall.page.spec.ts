import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconferencehallPage } from './addconferencehall.page';

describe('AddconferencehallPage', () => {
  let component: AddconferencehallPage;
  let fixture: ComponentFixture<AddconferencehallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddconferencehallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddconferencehallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
