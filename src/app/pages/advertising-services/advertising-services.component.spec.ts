import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingServicesComponent } from './advertising-services.component';

describe('AdvertisingServicesComponent', () => {
  let component: AdvertisingServicesComponent;
  let fixture: ComponentFixture<AdvertisingServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisingServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
