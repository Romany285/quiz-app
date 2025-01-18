import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDynamicFormComponent } from './auth-dynamic-form.component';

describe('AuthDynamicFormComponent', () => {
  let component: AuthDynamicFormComponent;
  let fixture: ComponentFixture<AuthDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthDynamicFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
