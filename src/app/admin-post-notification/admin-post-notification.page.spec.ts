import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostNotificationPage } from './admin-post-notification.page';

describe('AdminPostNotificationPage', () => {
  let component: AdminPostNotificationPage;
  let fixture: ComponentFixture<AdminPostNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostNotificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
