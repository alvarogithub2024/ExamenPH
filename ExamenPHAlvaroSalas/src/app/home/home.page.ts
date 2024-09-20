import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PublicacionComponent } from '../publicacion/publicacion.component'; 
import { Localstorageservice } from '../localstorage.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgIfContext} from '@angular/common';
import { IonButton, IonList, IonIcon, IonImg, IonItem, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";
import { EliminacionPublicacionModalComponent } from '../eliminacion-publicacion/eliminacion-publicacion.component';

interface Publicacion {
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, CommonModule, FormsModule, IonList, IonIcon, IonImg, IonItem, NgIf, EliminacionPublicacionModalComponent
  ]
})
export class HomePage {
  publicaciones: Publicacion[] = this.cargarPublicacionesDelLocalStorage(); // Inicializa las publicaciones
  publicacionAEliminar: Publicacion | null = null; // Publicación a eliminar
  mostrarModal = false; // para visibilizar la ventana modal

  constructor(private dialog: MatDialog, private localStorageService: Localstorageservice) {}

  // Cargar publicaciones del localStorage
  cargarPublicacionesDelLocalStorage(): Publicacion[] {
    const publicacionesGuardadas = localStorage.getItem('publicaciones');
    return publicacionesGuardadas ? JSON.parse(publicacionesGuardadas) : [];
  }

  // Guardar publicaciones en localStorage
  guardarPublicacionesEnLocalStorage() {
    localStorage.setItem('publicaciones', JSON.stringify(this.publicaciones));
  }

  // Abrir modal de eliminación
  abrirModalEliminacion(publicacion: Publicacion) {
    this.publicacionAEliminar = publicacion;
    this.mostrarModal = true;
  }

  // Confirmar eliminación de publicación
  confirmarEliminacion() {
    if (this.publicacionAEliminar) {
      this.publicaciones = this.publicaciones.filter(p => p !== this.publicacionAEliminar);
      this.guardarPublicacionesEnLocalStorage();
      this.cerrarModal();
    }
  }

  // Cancelar eliminación
  cancelarEliminacion() {
    this.cerrarModal();
  }

  // Cerrar modal
  cerrarModal() {
    this.mostrarModal = false;
    this.publicacionAEliminar = null;
  }

  // Abrir modal para creación o edición de publicación
  abrirModalCreacion(publicacion?: Publicacion): void {
    const dialogRef = this.dialog.open(PublicacionComponent, {
      width: '600px',
      data: publicacion ? { ...publicacion } : {} // Si existe, entonces edita la publicacion
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.publicaciones.findIndex(p => p.titulo === result.titulo && new Date(p.fecha).getTime() === new Date(result.fecha).getTime());
        if (index !== -1) {
          this.publicaciones[index] = result; // Actualiza publicación existente
        } else {
          this.publicaciones.push(result); // Agrega nueva publicación
        }
        this.guardarPublicacionesEnLocalStorage(); // Actualiza el local storage
      }
    });
  }

  // Eliminar publicación 
  eliminarPublicacion(publicacion: Publicacion): void {
    this.publicaciones = this.publicaciones.filter(p => p !== publicacion);
    this.guardarPublicacionesEnLocalStorage(); // Actualiza el local storage
  }
}
