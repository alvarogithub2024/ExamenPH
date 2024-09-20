import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Localstorageservice {

  constructor() { }

  // Guardar datos en localStorage
  setData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener datos desde localStorage
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Eliminar un dato de localStorage
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage
  clearData(): void {
    localStorage.clear();
  }
}
