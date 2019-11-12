import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackUpdatePage } from './feedback-update.page';

describe('FeedbackUpdatePage', () => {
  let component: FeedbackUpdatePage;
  let fixture: ComponentFixture<FeedbackUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
