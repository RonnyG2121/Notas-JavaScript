import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CortometrajeDetalleComponent } from './cortometraje-detalle.component';

describe('CortometrajeDetalleComponent', () => {
  let component: CortometrajeDetalleComponent;
  let fixture: ComponentFixture<CortometrajeDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CortometrajeDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CortometrajeDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
