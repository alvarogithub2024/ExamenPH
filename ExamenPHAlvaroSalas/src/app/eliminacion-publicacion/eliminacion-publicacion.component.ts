import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone'; 

@Component({
  selector: 'app-eliminacion-publicacion',
  templateUrl: './eliminacion-publicacion.component.html',
  styleUrls: ['./eliminacion-publicacion.component.scss'],
  standalone: true,
  imports: [IonButton] 
})
export class EliminacionPublicacionModalComponent {
  @Input() publicacionAEliminar: any; //
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>(); 

  confirmarEliminacion() {
    this.confirmDelete.emit(); 
  }

  cancelarEliminacion() {
    this.cancelDelete.emit();
  }
}
