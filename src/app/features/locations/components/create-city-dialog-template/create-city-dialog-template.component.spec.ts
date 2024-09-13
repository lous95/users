import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCityDialogTemplateComponent } from './create-city-dialog-template.component';

describe('CreateCityDialogTemplateComponent', () => {
  let component: CreateCityDialogTemplateComponent;
  let fixture: ComponentFixture<CreateCityDialogTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCityDialogTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCityDialogTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
