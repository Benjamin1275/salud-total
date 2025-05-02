import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasAtencionComponent } from './horas-atencion.component';

describe('HorasAtencionComponent', () => {
  let component: HorasAtencionComponent;
  let fixture: ComponentFixture<HorasAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorasAtencionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
