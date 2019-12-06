import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusCreateComponent } from './bus-create.component';

describe('BusCreateComponent', () => {
  let component: BusCreateComponent;
  let fixture: ComponentFixture<BusCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
