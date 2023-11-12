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
                    user: 'thurman.mertz@ethereal.email',
                    pass: 'pDyGKT7kE4JYp3QKya'
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