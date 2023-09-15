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
            user: 'alexandrine.hilpert@ethereal.email',
            pass: '65BwfE99yh59q1r3BF'
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

/* data structure for send mails
    let mailOptions = 
    {
        from: 'alexandrine.hilpert@ethereal.email',
        to: 'jessyca.armstrong@ethereal.email',
        subject: 'Test MailerController',
        text: 'Prueba de envio por fuera'
    }
*/
module.exports = { ISFT151Mailer }