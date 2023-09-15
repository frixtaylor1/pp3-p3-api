const mysql = require('mysql2');

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'tu_host',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos'
});

// Conecta a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

class InscriptionHandler {
  createInscription(pState) {
    return new Promise((resolve, reject) => {
      const sql = 'CALL usp_create_inscription(?)';
      connection.query(sql, [pState], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve('Inscripción creada exitosamente');
      });
    });
  }

  removeInscription(pIdInscription) {
    return new Promise((resolve, reject) => {
      const sql = 'CALL usp_remove_inscription(?)';
      connection.query(sql, [pIdInscription], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve('Inscripción eliminada exitosamente');
      });
    });
  }

  readInscription(pIdInscription) {
    return new Promise((resolve, reject) => {
      const sql = 'CALL usp_read_inscription(?)';
      connection.query(sql, [pIdInscription], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (results[0].length > 0) {
          resolve(results[0][0]);
        } else {
          resolve(null); // No se encontró la inscripción
        }
      });
    });
  }

  updateInscription(pIdInscription, pState) {
    return new Promise((resolve, reject) => {
      const sql = 'CALL usp_update_inscription(?, ?)';
      connection.query(sql, [pIdInscription, pState], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve('Inscripción actualizada exitosamente');
      });
    });
  }
}

// Ejemplo de uso:
const inscriptionHandler = new InscriptionHandler();

// Ejemplos de operaciones CRUD
// inscriptionHandler.createInscription('Nuevo Estado')
//   .then(result => console.log(result))
//   .catch(err => console.error('Error:', err));

// inscriptionHandler.updateInscription(1, 'Nuevo Estado Actualizado')
//   .then(result => console.log(result))
//   .catch(err => console.error('Error:', err));

// inscriptionHandler.removeInscription(1)
//   .then(result => console.log(result))
//   .catch(err => console.error('Error:', err));

// inscriptionHandler.readInscription(1)
//   .then(result => {
//     if (result) {
//       console.log(result);
//     } else {
//       console.log('Inscripción no encontrada');
//     }
//   })
//   .catch(err => console.error('Error:', err));

// Cierra la conexión a la base de datos cuando hayas terminado
// connection.end();
