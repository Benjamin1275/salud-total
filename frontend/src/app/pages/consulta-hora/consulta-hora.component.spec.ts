import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaHoraComponent } from './consulta-hora.component';

describe('ConsultaHoraComponent', () => {
  let component: ConsultaHoraComponent;
  let fixture: ComponentFixture<ConsultaHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaHoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
