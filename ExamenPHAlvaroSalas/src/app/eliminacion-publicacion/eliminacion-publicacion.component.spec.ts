import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EliminacionPublicacionComponent } from './eliminacion-publicacion.component';

describe('EliminacionPublicacionComponent', () => {
  let component: EliminacionPublicacionComponent;
  let fixture: ComponentFixture<EliminacionPublicacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EliminacionPublicacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminacionPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
