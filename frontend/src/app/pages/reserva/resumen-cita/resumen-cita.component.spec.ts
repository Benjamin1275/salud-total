import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCitaComponent } from './resumen-cita.component';

describe('ResumenCitaComponent', () => {
  let component: ResumenCitaComponent;
  let fixture: ComponentFixture<ResumenCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
