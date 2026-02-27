import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Productos } from './producto/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  url = 'https://tienda-online-angular-8d0f1-default-rtdb.firebaseio.com/';
  constructor(private httpClient: HttpClient) {}

  listarProductos(): Observable<{[llave: string] : Productos}> {
    return this.httpClient.get<{[llave:string] :Productos}>(this.url + 'datos.json');
  }
  
    guardarProducto(producto: Productos): Observable<any> {
    return this.httpClient.post(`${this.url}datos.json`, producto)
  }

}