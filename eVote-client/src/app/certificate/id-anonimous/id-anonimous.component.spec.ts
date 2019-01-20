import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdAnonimousComponent } from './id-anonimous.component';

describe('IdAnonimousComponent', () => {
  let component: IdAnonimousComponent;
  let fixture: ComponentFixture<IdAnonimousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdAnonimousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdAnonimousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
