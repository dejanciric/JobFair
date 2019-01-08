import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobfairComponent } from './new-jobfair.component';

describe('NewJobfairComponent', () => {
  let component: NewJobfairComponent;
  let fixture: ComponentFixture<NewJobfairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJobfairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJobfairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
