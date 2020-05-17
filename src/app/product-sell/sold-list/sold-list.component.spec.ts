import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldListComponent } from './sold-list.component';

describe('SoldListComponent', () => {
  let component: SoldListComponent;
  let fixture: ComponentFixture<SoldListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
