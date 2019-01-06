import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsCompanyComponent } from './results-company.component';

describe('ResultsCompanyComponent', () => {
  let component: ResultsCompanyComponent;
  let fixture: ComponentFixture<ResultsCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
