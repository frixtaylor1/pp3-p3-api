/**
 * @file PDFHandler.js
 * @license GPL-3.0
 * 
 * Copyright (c) 2023 Omar Lopez, 
 *                    Evelyn Flores, 
 *                    Karen Manchado, 
 *                    Facundo Caminos, 
 *                    Ignacio Moreno,
 *                    Kevin Taylor,
 *                    Matias Cardenas
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

const puppeteer = require("puppeteer");

class PDFHandler
{
  constructor()
  {
    this.format = "A4";
    this.path = "./MailResources/";
  }

    /**
   * @brief Genera archivo PDF con los datos de preinscripcion del estudiante...
   * 
   * @param {object} data 
   * 
   * @param {string} filename 
   * 
   * @return {void}
   **/
  async generatePDF(filename,data)
  {
    let htmlContent = this.#parseToHTMLContent(data);
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    // Generar el PDF
    await page.pdf({ path: `${this.path}${filename}.pdf` , format: this.format });

    await browser.close();

  }
    /**
   * @brief Genera contenido HTML estructurado a partir de un objeto...
   * 
   * @param {object} data 
   * 
   * @return {string} HTMLContent
   **/
  #parseToHTMLContent(data)
  {
    const contenidoHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Información del Estudiante</title>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
    
        <h1>Información del Estudiante</h1>
    
        <table>
            <tr>
                <th>Atributo</th>
                <th>Valor</th>
            </tr>
            ${Object.entries(data)
              .map(([atributo, valor]) => `
                <tr>
                    <td>${atributo}</td>
                    <td>${valor}</td>
                </tr>
              `)
              .join('')}
        </table>
    
    </body>
    </html>`;

    return contenidoHtml;
  }
}

// // // Ejemplo de uso
// let pdfHandler = new PDFHandler();

// // Datos de ejemplo (puedes obtener estos datos de una API, una base de datos, etc.)
// const datos =
//   {
//     nombre          : 'Omar',
//     carrera         : 'Sistemas',
//     email           : 'Omar@gmail.com',
//     foto            : null,
//     apellido        : 'Lopez',
//     dni             : '32132132',
//     fechaNacimiento : '12/12/2002',
//     telefono        : 32321323213,
//   }

// pdfHandler.generatePDF(321321321,datos);

module.exports = { PDFHandler }