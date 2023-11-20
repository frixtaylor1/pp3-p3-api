/**
 * @file PDFHandler.js
 * @license GPL-3.0
 * 
 * Copyright (c) 2023 Omar Lopez, 
 *                    Evelyn Oliva, 
 *                    Karen Manchado, 
 *                    Facundo Caminos, 
 *                    Ignacio Moreno,
 *                    Kevin Taylor,
 *                    Matias Cardenas
 *                    Daniel Beinat
 *                    ISFT N° 151
 *
 *  Project Supervisor: Prof. Matias Santiago Gastón
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * Year: 2023
 */

const fs = require('fs');
const PDFDocumentWithTables = require('pdfkit-table');

class PDFHandler {
  constructor() {
    this.path = './MailResources/';
  }

  /**
   * Genera un archivo PDF con el nombre de archivo como id_user.
   *
   * @param {string} filename - El nombre del archivo PDF que se generará.
   * @param {object} data - Los datos utilizados para poblar el archivo PDF.
   */
  generatePDF(filename, data) {
    const writeStream = fs.createWriteStream(`${this.path}${filename}.pdf`);
    const pdfDoc = new PDFDocumentWithTables();

    pdfDoc.pipe(writeStream);

    const tableData = {
      headers: ['Parametros', 'Tus Datos'],
      rows: [
        ['id de usuario', data.id_user],
        ['id de carrera', data.id_major],
        ['id de preinscripción', data.id_preinscription],
        ['nombre', data.name],
        ['apellido', data.surname],
        ['dni', data.dni],
        ['fecha de nacimiento', data.birthdate],
        ['email', data.email]
      ]
    };

    const options = {
      prepareHeader: () => pdfDoc.font('Helvetica-Bold'),
      prepareRow: (row, i) => pdfDoc.font('Helvetica').fontSize(12)
    };

    pdfDoc.table(tableData, options);

    pdfDoc.end();
    console.log(`PDF generado y guardado en: ${this.path}${filename}.pdf`);
  }
}

module.exports = { PDFHandler };
