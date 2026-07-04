import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getVehiculos(): Observable<any[]> { return this.http.get<any[]>(`${this.url}/vehiculos`); }
  registrarVehiculo(v: any): Observable<any> { return this.http.post(`${this.url}/vehiculos`, v); }

  getClientes(): Observable<any[]> { return this.http.get<any[]>(`${this.url}/clientes`); }
  registrarCliente(c: any): Observable<any> { return this.http.post(`${this.url}/clientes`, c); }

  getAlquileres(): Observable<any[]> { return this.http.get<any[]>(`${this.url}/alquileres`); }
  registrarAlquiler(a: any): Observable<any> { return this.http.post(`${this.url}/alquileres`, a); }
}
