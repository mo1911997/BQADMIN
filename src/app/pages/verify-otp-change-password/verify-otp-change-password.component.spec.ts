import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOtpChangePasswordComponent } from './verify-otp-change-password.component';

describe('VerifyOtpChangePasswordComponent', () => {
  let component: VerifyOtpChangePasswordComponent;
  let fixture: ComponentFixture<VerifyOtpChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyOtpChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyOtpChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
