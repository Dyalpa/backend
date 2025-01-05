const express = require('express');
const sqliteCloud = require('@sqlitecloud/drivers');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = new sqliteCloud.Database('sqlitecloud://chou0cqink.sqlite.cloud:8860/ctos?apikey=FjGs3gl1NGl8QOiel0k7s7Fwt4EhjoN6paM2MYtYhm0');

db.on('connect', () => {
  console.log('Conectado a la base de datos SQLite en la nube.');
});

db.on('error', (err) => {
  console.error('Error de conexión:', err.message);
});

// Ruta para obtener todos los datos de cto sin filtro
app.get('/cto', (req, res) => {
  const query = 'SELECT * FROM cto';
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Ruta para obtener datos de cto filtrado por `numero_cto`
app.get('/cto-buscar', (req, res) => {
  const cto = req.query.cto;
  console.log('Valor recibido para cto:', cto);

  if (!cto) {
    res.status(400).send('El parámetro cto es requerido.');
    return;
  }

  const query = `SELECT * FROM cto WHERE numero_cto = "${cto}"`;
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});


// Ruta para actualizar la dirección de una CTO
app.put('/cto/:id/direccion', (req, res) => {
  const ctoId = req.params.id;
  const nuevaDireccion = req.body.direccion;
  // Verificar si los parámetros se reciben correctamente
  console.log('Actualizando CTO ID:', ctoId);
  console.log('Nueva dirección:', nuevaDireccion);

  if (!ctoId || !nuevaDireccion) {
    res.status(400).send('ID de CTO y nueva dirección son requeridos.');
    return;
  }
  // Concatenar parámetros directamente en la consulta
  const query = `UPDATE cto SET direccion_cto = '${nuevaDireccion}' WHERE numero_cto = '${ctoId}'`;
  console.log('Consulta SQL:', query);

  db.run(query, function(error) {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send('Error ejecutando query: ' + error.message);
    } else {
      console.log('Número de cambios realizados:', this.changes);
      res.status(200).json({ changes: this.changes });
    }
  });
});

// Ruta para obtener todos los datos de abonado sin filtro
app.get('/abonado', (req, res) => {
  const query = 'SELECT * FROM abonado';
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Ruta para obtener datos de abonado filtrados por `abonado`
app.get('/abonado-buscar', (req, res) => {
  const abonado = req.query.abonado;
  console.log('Valor recibido para abonado:', abonado);

  if (!abonado) {
    res.status(400).send('El parámetro abonado es requerido.');
    return;
  }

  const query = `SELECT * FROM abonado WHERE abonado = "${abonado}"`;
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Ruta para obtener todos los datos de cai sin filtro
app.get('/cai', (req, res) => {
  const query = 'SELECT * FROM cai';
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Ruta para obtener datos de cai filtrados por `cai`
app.get('/cai-buscar', (req, res) => {
  const cai = req.query.cai;
  console.log('Valor recibido para cai:', cai);

  if (!cai) {
    res.status(400).send('El parámetro cai es requerido.');
    return;
  }

  const query = `SELECT * FROM cai WHERE CAI = "${cai}"`;
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Ruta para obtener todos los datos de cliente sin filtro
app.get('/cliente', (req, res) => {
  const query = 'SELECT * FROM cliente';
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Ruta para obtener datos de cliente filtrados por `cedula`
app.get('/cliente-buscar', (req, res) => {
  const cedula = req.query.cedula;
  console.log('Valor recibido para cliente:', cedula);

  if (!cedula) {
    res.status(400).send('El parámetro cedula es requerido.');
    return;
  }

  const query = `SELECT * FROM cliente WHERE cedula = "${cedula}"`;
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});


// Ruta para obtener datos del historial con múltiples filtros
app.get('/historial', (req, res) => {
  const { cedula_cliente, cedula_tecnico, abonado, cai } = req.query;
  let query = 'SELECT * FROM historial WHERE 1=1';
  const params = [];
  if (cedula_cliente) {
    query += ` AND cedula_cliente = "${cedula_cliente}"`;
    params.push(cedula_cliente);
  }
  if (cedula_tecnico) {
    query += ` AND cedula_tecnico = "${cedula_tecnico}"`;
    params.push(cedula_tecnico);
  }
  if (abonado) {
    query += ` AND abonado = "${abonado}"`;
    params.push(abonado);
  }
  if (cai) {
    query += ` AND cai = "${cai}"`;
    params.push(cai);
  }
  db.all(query, params, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
});

// Ruta para obtener datos del historial agrupados por producto y contados por cantidad para un técnico específico
app.get('/historial/tecnico-productos', (req, res) => {
  const cedula_tecnico = req.query.cedula_tecnico;
  const fecha_actuacion = req.query.fecha_actuacion;
  
  let query = `
    SELECT producto, COUNT(*) as cantidad FROM historial
    WHERE cedula_tecnico = "${cedula_tecnico}"
  `;
  
  if (fecha_actuacion) {
    console.log('Filtrando por fecha:', fecha_actuacion);
    query += ` AND DATE(fecha_actuacion) = "${fecha_actuacion}"`;
  }

  query += ' GROUP BY producto';

  console.log('Consulta SQL:', query);

  db.all(query, [], (error, productResults) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      let totalQuery = `
        SELECT COUNT(*) as total FROM historial
        WHERE cedula_tecnico = "${cedula_tecnico}"
      `;
      
      if (fecha_actuacion) {
        totalQuery += ` AND DATE(fecha_actuacion) = "${fecha_actuacion}"`;
      }

      console.log('Consulta Total SQL:', totalQuery);

      db.get(totalQuery, [], (error, totalResults) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.json({ products: productResults, total: totalResults.total });
        }
      });
    }
  });
});





// Ruta para obtener datos de spliter agrupados por CTO y contados por cantidad para una CTO en específico
app.get('/spliter/spliter-CTO', (req, res) => {
  const spliter = req.query.spliter;
  
  const query = `
    SELECT CTO, COUNT(*) as cantidad FROM spliter
    WHERE spliter = "${spliter}"
    GROUP BY CTO
  `;
  
  db.all(query, [spliter], (error, productResults) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      const totalQuery = `
        SELECT COUNT(*) as total FROM spliter
        WHERE spliter = "${spliter}"
      `;
      
      db.get(totalQuery, [spliter], (error, totalResults) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.json({ products: productResults, total: totalResults.total });
        }
      });
    }
  });
});

// Ruta para obtener todos los datos de tecnicos sin filtro
app.get('/tecnico', (req, res) => {
  const query = 'SELECT * FROM tecnico';
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Ruta para obtener datos de técnicos filtrado por `cedula`
app.get('/tecnico-buscar', (req, res) => {
  const cedula = req.query.cedula;
  console.log('Valor recibido para tecnico:', cedula);

  if (!cedula) {
    res.status(400).send('El parámetro cedula es requerido.');
    return;
  }

  const query = `SELECT * FROM tecnico WHERE cedula = "${cedula}"`;
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Ruta para obtener todos los datos de spliter sin filtro
app.get('/spliter', (req, res) => {
  const query = 'SELECT * FROM spliter';
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Ruta para obtener datos de spliter filtrado por `spliter`
app.get('/spliter-buscar', (req, res) => {
  const spliter = req.query.spliter;
  console.log('Valor recibido para spliter:', spliter);

  if (!spliter) {
    res.status(400).send('El parámetro spliter es requerido.');
    return;
  }

  const query = `SELECT * FROM spliter WHERE spliter = "${spliter}"`;
  console.log('Consulta SQL:', query);

  db.all(query, [], (error, results) => {
    if (error) {
      console.error('Error ejecutando query:', error.message);
      res.status(500).send(error.message);
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});

// Rutas para las otras tablas...
app.get('/cai', (req, res) => {
  db.all('SELECT * FROM cai', (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
});

app.get('/cliente', (req, res) => {
  db.all('SELECT * FROM cliente', (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
});

app.get('/tecnico', (req, res) => {
  db.all('SELECT * FROM tecnico', (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
