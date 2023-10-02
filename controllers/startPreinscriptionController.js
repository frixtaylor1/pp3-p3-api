const mysql = require("mysql");
const connection = require("../db/db");
const { isValidEmail, isValidDate } = require("../validation");

class StartPreinscriptionController {
  static handleRequest(req, res) {
    const { name, surname, dni, mail, birthDate, age, career_name } = req.body;

    if (
      !name ||
      !surname ||
      !dni ||
      !mail ||
      !birthDate ||
      !age ||
      !career_name
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (!isValidEmail(mail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!isValidDate(birthDate)) {
      return res.status(400).json({ error: "Invalid date of birth format" });
    }

    connection.query(
      "CALL create_preinscription(?, ?, ?, ?, ?, ?, ?)",
      [name, surname, dni, mail, birthDate, age, career_name],
      (error, results) => {
        if (error) {
          console.error("Error:", error);
          res.status(500).json({ error: "Internal server error" });
        } else {
          const [preinscriptionId, careerId] = results[0];
          res.status(200).json({
            Message: "Pre-inscription success!",
            preinscriptionId,
            careerId,
          });
        }
      }
    );
  }
}

module.exports = StartPreinscriptionController;
