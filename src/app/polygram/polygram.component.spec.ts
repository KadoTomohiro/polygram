import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygramComponent } from './polygram.component';

describe('PolygramComponent', () => {
  let component: PolygramComponent;
  let fixture: ComponentFixture<PolygramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
