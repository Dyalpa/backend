const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Luis_1988',
  database: 'ctos'
});

connection.connect();

// Ruta para obtener datos de CTO filtrados por `numero_cto`
app.get('/cto', (req, res) => {
  const cto = req.query.cto;
  let query = 'SELECT * FROM cto';
  if (cto) {
    query += ` WHERE numero_cto = '${cto}'`;
  }
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Rutas para la tabla 'cto'
app.post('/cto', (req, res) => {
  const newData = req.body;
  connection.query('INSERT INTO cto SET ?', newData, (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.insertId });
  });
});

app.put('/cto/:id', (req, res) => {
  const updatedData = req.body;
  connection.query('UPDATE cto SET ? WHERE id = ?', [updatedData, req.params.id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// Ruta para actualizar la dirección de una CTO
app.put('/cto/:id/direccion', (req, res) => {
  const ctoId = req.params.id;
  const nuevaDireccion = req.body.direccion;
  connection.query('UPDATE cto SET direccion_cto = ? WHERE numero_cto = ?', [nuevaDireccion, ctoId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'Dirección actualizada' });
  });
});

// Ruta para obtener datos de abonado filtrados por `abonado`
app.get('/abonado', (req, res) => {
  const abonado = req.query.abonado;
  let query = 'SELECT * FROM abonado';
  if (abonado) {
    query += ` WHERE abonado = '${abonado}'`;
  }
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Ruta para obtener datos de cai filtrados por `cai`
app.get('/cai', (req, res) => {
  const cai = req.query.cai;
  let query = 'SELECT * FROM cai';
  if (cai) {
    query += ` WHERE cai = '${cai}'`;
  }
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Ruta para obtener datos de abonado filtrados por `cedula`
app.get('/cliente', (req, res) => {
  const cedula = req.query.cedula; // Asegúrate de que 'cedula' sea la variable utilizada
  let query = 'SELECT * FROM cliente';
  if (cedula) {
    query += ` WHERE cedula = '${cedula}'`;
  }
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Ruta para obtener datos del historial con múltiples filtros
app.get('/historial', (req, res) => {
  const { cedula_cliente, cedula_tecnico, abonado, cai } = req.query;
  let query = 'SELECT * FROM historial WHERE 1=1'; // 1=1 es un truco para facilitar la concatenación de condiciones
  if (cedula_cliente) {
    query += ` AND cedula_cliente = '${cedula_cliente}'`;
  }
  if (cedula_tecnico) {
    query += ` AND cedula_tecnico = '${cedula_tecnico}'`;
  }
  if (abonado) {
    query += ` AND abonado = '${abonado}'`;
  }
  if (cai) {
    query += ` AND cai = '${cai}'`;
  }

  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Ruta para obtener datos del historial agrupados por producto y contados por cantidad para un técnico específico
app.get('/historial/tecnico-productos', (req, res) => {
  const cedula_tecnico = req.query.cedula_tecnico;
  const fecha_actuacion = req.query.fecha_actuacion;
  
  let query = `
    SELECT producto, COUNT(*) as cantidad FROM historial
    WHERE cedula_tecnico = '${cedula_tecnico}'
  `;
  
  if (fecha_actuacion) {
    query += ` AND DATE(fecha_actuacion) = '${fecha_actuacion}'`;
  }

  query += ` GROUP BY producto`;

  let totalQuery = `
    SELECT COUNT(*) as total FROM historial
    WHERE cedula_tecnico = '${cedula_tecnico}'
  `;
  
  if (fecha_actuacion) {
    totalQuery += ` AND DATE(fecha_actuacion) = '${fecha_actuacion}'`;
  }

  connection.query(query, (error, productResults) => {
    if (error) throw error;
    connection.query(totalQuery, (error, totalResults) => {
      if (error) throw error;
      res.json({ products: productResults, total: totalResults[0].total });
    });
  });
});

// Ruta para obtener datos de spliter agrupados por CTO y contados por cantidad para una CTO en especifico
app.get('/spliter/spliter-CTO', (req, res) => {
  const spliter = req.query.spliter;
  
  let query = `
    SELECT CTO, COUNT(*) as cantidad FROM spliter
    WHERE spliter = '${spliter}'
    GROUP BY CTO
  `;
  
  let totalQuery = `
    SELECT COUNT(*) as total FROM spliter
    WHERE spliter = '${spliter}'
  `;
  
  connection.query(query, (error, productResults) => {
    if (error) throw error;
    connection.query(totalQuery, (error, totalResults) => {
      if (error) throw error;
      res.json({ products: productResults, total: totalResults[0].total });
    });
  });
});

// Ruta para obtener datos de tecnicos filtrado por `cedula`
app.get('/tecnico', (req, res) => {
  const Cedula = req.query.Cedula; // Asegúrate de que 'cedula_cliente' sea la variable utilizada
  let query = 'SELECT * FROM tecnico';
  if (Cedula) {
    query += ` WHERE Cedula = '${Cedula}'`;
  }
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Ruta para obtener datos de spliter filtrado por `spliter`
app.get('/spliter', (req, res) => {
  const spliter = req.query.spliter; // Asegúrate de que 'cedula_cliente' sea la variable utilizada
  let query = 'SELECT * FROM spliter';
  if (spliter) {
    query += ` WHERE spliter = '${spliter}'`;
  }
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Rutas para las otras tablas...
app.get('/cai', (req, res) => {
  connection.query('SELECT * FROM cai', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/cliente', (req, res) => {
  connection.query('SELECT * FROM cliente', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/tecnico', (req, res) => {
  connection.query('SELECT * FROM tecnico', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});