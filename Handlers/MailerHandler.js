/**
 * @file MailerHandler.js
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

var nodemailer = require('nodemailer');

//https://ethereal.email/create para crear mails aleatorios

//SMTP: es un protocolo TCP/IP que se utiliza para enviar y recibir correo electrónico.

//Para gmail se necesita verificación de 2 pasos y luego crear contraseña para aplicaciones

class ISFT151Mailer 
{
    constructor() 
    {
        //data configuration 
        this.transporter = nodemailer.createTransport
            ({
                host: "smtp.ethereal.email",//type of mail smtp.xxx.xxx
                port: 587,
                secure: false, // true for 465, false for other ports
                auth:
                {
                    user: 'connor.nolan68@ethereal.email',
                    pass: 'f9erNJkeUZFh3KE8Nx'
                }
            });
    }
    async sendEmail(mailOptions) 
    {
        const response = await this.transporter.sendMail(mailOptions)

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(response));

        return response.messageId;
    }
};

/* data structure for send mails */
/* 
let mailOptions =
{
    from: 'thurman.mertz@ethereal.email',
    to: 'marlee.pollich@ethereal.email',
    subject: 'Test MailerController',
    text: 'Prueba de envio por fuera',
    attachments: //an object for each files to be send 
        [
            {
                filename: 'api-specification.pdf',
                path: './MailResources/api-specification.pdf',
                contentType: 'application/pdf'
            }
        ]
}

const mailer = new ISFT151Mailer();

mailer.sendEmail(mailOptions); */

module.exports = { ISFT151Mailer };