import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  vehiculos: any[] = [];
  clientes: any[] = [];
  alquileres: any[] = [];

  nuevoVehiculo = { marca: '', modelo: '', anio: 2026 };
  nuevoCliente = { nombre: '', apellido: '', licencia: '', telefono: '' };
  nuevoAlquiler = { vehiculo_id: '', cliente_id: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarTodo();
  }

  cargarTodo() {
    this.apiService.getVehiculos().subscribe(data => this.vehiculos = data);
    this.apiService.getClientes().subscribe(data => this.clientes = data);
    this.apiService.getAlquileres().subscribe(data => this.alquileres = data);
  }

  guardarVehiculo() {
    if (!this.nuevoVehiculo.marca || !this.nuevoVehiculo.modelo) return;
    this.apiService.registrarVehiculo(this.nuevoVehiculo).subscribe(() => {
      this.cargarTodo();
      this.nuevoVehiculo = { marca: '', modelo: '', anio: 2026 };
    });
  }

  guardarCliente() {
    if (!this.nuevoCliente.nombre || !this.nuevoCliente.licencia) return;
    this.apiService.registrarCliente(this.nuevoCliente).subscribe(() => {
      this.cargarTodo();
      this.nuevoCliente = { nombre: '', apellido: '', licencia: '', telefono: '' };
    });
  }

  guardarAlquiler() {
    if (!this.nuevoAlquiler.vehiculo_id || !this.nuevoAlquiler.cliente_id) return;
    this.apiService.registrarAlquiler(this.nuevoAlquiler).subscribe(() => {
      this.cargarTodo();
      this.nuevoAlquiler = { vehiculo_id: '', cliente_id: '' };
    });
  }
}
