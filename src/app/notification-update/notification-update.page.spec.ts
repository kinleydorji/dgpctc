import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationUpdatePage } from './notification-update.page';

describe('NotificationUpdatePage', () => {
  let component: NotificationUpdatePage;
  let fixture: ComponentFixture<NotificationUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
