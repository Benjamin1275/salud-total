import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAgendadasComponent } from './citas-agendadas.component';

describe('CitasAgendadasComponent', () => {
  let component: CitasAgendadasComponent;
  let fixture: ComponentFixture<CitasAgendadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasAgendadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasAgendadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
