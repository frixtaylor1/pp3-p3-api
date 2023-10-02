const mysql = require("mysql");
const connection = require("../db/db");
const { isNotEmpty, isValidEmail } = require("../validation");

class CancelPreinscriptionController {
  static handleRequest(req, res) {
    const { p_mail } = req.body;

    if (!isNotEmpty(p_mail)) {
      return res.status(400).json({ error: "Email is required!" });
    }

    if (!isValidEmail(p_mail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const query = "CALL cancelPreinscription(?)";

    connection.query(query, [p_mail], (err, results) => {
      if (err) {
        console.error(
          "Error al ejecutar el procedimiento almacenado: " + err.message
        );
        res.status(500).json({ error: "Error al cancelar la preinscripción" });
      } else {
        const message = results[0][0].Message;
        res.json({ message });
      }
    });
  }
}

module.exports = CancelPreinscriptionController;
