import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Camera, CameraResultType } from '@capacitor/camera';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { IonImg } from "@ionic/angular/standalone";

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
  imports: [IonImg, BrowserAnimationsModule, MatFormFieldModule,MatInputModule,ReactiveFormsModule,
  ]
})
export class PublicacionComponent {
  formPublicacion: FormGroup;
  imagenSeleccionada: string | ArrayBuffer | null = null;
  fechaActual = new Date(); // Fecha y hora actual

  @ViewChild('fileInput') fileInput!: ElementRef; // Referencia para input de archivos
  @ViewChild('videoElement') videoElement!: ElementRef; // Referencia para video

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PublicacionComponent>) {
    this.formPublicacion = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      fecha: [{ value: this.fechaActual, disabled: true }] 
    });
  }

 iniciarCamara() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (this.videoElement && this.videoElement.nativeElement) {
            this.videoElement.nativeElement.srcObject = stream;
          }
        })
        .catch(error => {
          console.error('Error al acceder a la cámara:', error);
        });
    } else {
      console.error('Navegador no soporta getUserMedia.');
    }
  }

  capturarFoto() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    if (context && this.videoElement && this.videoElement.nativeElement) {
      canvas.width = this.videoElement.nativeElement.videoWidth;
      canvas.height = this.videoElement.nativeElement.videoHeight;
      
      
      context.drawImage(this.videoElement.nativeElement, 0, 0);
      
      
      this.imagenSeleccionada = canvas.toDataURL('image/jpeg');
      console.log('Imagen capturada:', this.imagenSeleccionada);
    } else {
      console.error('No se pudo capturar la foto.');
    }
  }
  
//  
  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files ? element.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenSeleccionada = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarPublicacion(): void {
    if (this.formPublicacion.valid && this.imagenSeleccionada) {
      const nuevaPublicacion = {
        titulo: this.formPublicacion.get('titulo')?.value,
        descripcion: this.formPublicacion.get('descripcion')?.value,
        imagen: this.imagenSeleccionada,
        fecha: this.fechaActual
      };
      this.dialogRef.close(nuevaPublicacion);
    } else {
      this.formPublicacion.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
