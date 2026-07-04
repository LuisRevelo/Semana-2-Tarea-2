const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'database.json');

const readData = () => {
    if (!fs.existsSync(FILE_PATH)) {
        const initialStructure = { vehiculos: [], clientes: [], alquileres: [] };
        fs.writeFileSync(FILE_PATH, JSON.stringify(initialStructure, null, 2));
        return initialStructure;
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
};

const writeData = (data) => fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

// APIS VEHÍCULOS
app.get('/api/vehiculos', (req, res) => res.json(readData().vehiculos));
app.post('/api/vehiculos', (req, res) => {
    const data = readData();
    const nuevo = {
        vehiculo_id: data.vehiculos.length > 0 ? data.vehiculos[data.vehiculos.length - 1].vehiculo_id + 1 : 1,
        marca: req.body.marca, modelo: req.body.modelo, anio: parseInt(req.body.anio) || 2026, disponible: true
    };
    data.vehiculos.push(nuevo);
    writeData(data);
    res.json(nuevo);
});

// APIS CLIENTES
app.get('/api/clientes', (req, res) => res.json(readData().clientes));
app.post('/api/clientes', (req, res) => {
    const data = readData();
    const nuevo = {
        cliente_id: data.clientes.length > 0 ? data.clientes[data.clientes.length - 1].cliente_id + 1 : 1,
        nombre: req.body.nombre, apellido: req.body.apellido, licencia: req.body.licencia, telefono: req.body.telefono
    };
    data.clientes.push(nuevo);
    writeData(data);
    res.json(nuevo);
});

// APIS ALQUILERES (La ruta faltante)
app.get('/api/alquileres', (req, res) => {
    const data = readData();
    const resultado = data.alquileres.map(alq => {
        const v = data.vehiculos.find(veh => veh.vehiculo_id === alq.vehiculo_id);
        const c = data.clientes.find(cli => cli.cliente_id === alq.cliente_id);
        return {
            alquiler_id: alq.alquiler_id,
            vehiculo: v ? `${v.marca} ${v.modelo}` : `Vehículo ID: ${alq.vehiculo_id}`,
            cliente: c ? `${c.nombre} ${c.apellido}` : `Cliente ID: ${alq.cliente_id}`
        };
    });
    res.json(resultado);
});

app.post('/api/alquileres', (req, res) => {
    const data = readData();
    const vehiculo_id = parseInt(req.body.vehiculo_id);
    const cliente_id = parseInt(req.body.cliente_id);

    const vehiculo = data.vehiculos.find(v => v.vehiculo_id === vehiculo_id);
    if (!vehiculo) return res.status(404).json({ error: 'Vehículo no encontrado' });
    
    // Cambiar estado a no disponible
    vehiculo.disponible = false;

    const nuevoAlquiler = {
        alquiler_id: data.alquileres.length > 0 ? data.alquileres[data.alquileres.length - 1].alquiler_id + 1 : 1,
        vehiculo_id,
        cliente_id
    };
    data.alquileres.push(nuevoAlquiler);
    writeData(data);
    res.json(nuevoAlquiler);
});

app.listen(3000, () => console.log('>>> SISTEMA COMPLETO CORRIENDO EN PUERTO 3000 <<<'));
