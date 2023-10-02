const mysql = require("mysql");
const connection = require("../db/db");
const { isValidEmail } = require("../validation");

class ConfirmPreinscriptionController {
  static handleRequest(req, res) {
    const { p_mail } = req.body;

    if (!p_mail) {
      return res.status(400).json({ error: "Email is required!" });
    }

    if (!isValidEmail(p_mail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    connection.query(
      "CALL confirmPreinscription(?)",
      [p_mail],
      (error, results) => {
        if (error) {
          console.error("Error:", error);
          res.status(500).json({ error: "Internal server error" });
        } else {
          const [result] = results[0];

          if (result && result.Result === 1) {
            res
              .status(200)
              .json({ Message: "Your pre-inscription was successful" });
          } else {
            res.status(409).json({
              Message: "Pre-inscription not found or already confirmed",
            });
          }
        }
      }
    );
  }
}

module.exports = ConfirmPreinscriptionController;
