import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninbroComponent } from './signinbro.component';

describe('SigninbroComponent', () => {
  let component: SigninbroComponent;
  let fixture: ComponentFixture<SigninbroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninbroComponent]
    });
    fixture = TestBed.createComponent(SigninbroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
