import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepollPage } from './createpoll.page';

describe('CreatepollPage', () => {
  let component: CreatepollPage;
  let fixture: ComponentFixture<CreatepollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepollPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
