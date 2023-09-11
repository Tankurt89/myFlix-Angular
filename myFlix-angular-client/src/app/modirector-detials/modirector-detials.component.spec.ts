import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModirectorDetialsComponent } from './modirector-detials.component';

describe('ModirectorDetialsComponent', () => {
  let component: ModirectorDetialsComponent;
  let fixture: ComponentFixture<ModirectorDetialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModirectorDetialsComponent]
    });
    fixture = TestBed.createComponent(ModirectorDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
