import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobfairComponent } from './apply-jobfair.component';

describe('ApplyJobfairComponent', () => {
  let component: ApplyJobfairComponent;
  let fixture: ComponentFixture<ApplyJobfairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyJobfairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyJobfairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
