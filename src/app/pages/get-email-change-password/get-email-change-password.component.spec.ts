import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmailChangePasswordComponent } from './get-email-change-password.component';

describe('GetEmailChangePasswordComponent', () => {
  let component: GetEmailChangePasswordComponent;
  let fixture: ComponentFixture<GetEmailChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetEmailChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmailChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
