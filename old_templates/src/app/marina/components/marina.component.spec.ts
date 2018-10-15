import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarinaComponent } from './marina.component';

describe('MarinaComponent', () => {
  let component: MarinaComponent;
  let fixture: ComponentFixture<MarinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
