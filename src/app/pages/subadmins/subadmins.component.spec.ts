import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminsComponent } from './subadmins.component';

describe('SubadminsComponent', () => {
  let component: SubadminsComponent;
  let fixture: ComponentFixture<SubadminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
