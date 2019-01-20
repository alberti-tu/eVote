import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverCertificateComponent } from './recover-certificate.component';

describe('RecoverCertificateComponent', () => {
  let component: RecoverCertificateComponent;
  let fixture: ComponentFixture<RecoverCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
