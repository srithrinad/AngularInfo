import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalTypeComponent } from './rental-type.component';

describe('RentalTypeComponent', () => {
  let component: RentalTypeComponent;
  let fixture: ComponentFixture<RentalTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
