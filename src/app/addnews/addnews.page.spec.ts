import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewsPage } from './addnews.page';

describe('AddnewsPage', () => {
  let component: AddnewsPage;
  let fixture: ComponentFixture<AddnewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
