import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddagendaPage } from './addagenda.page';

describe('AddagendaPage', () => {
  let component: AddagendaPage;
  let fixture: ComponentFixture<AddagendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddagendaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddagendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
