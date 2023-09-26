var nodemailer = require('nodemailer');

/** información para pruebas de mail:
     *  https://ethereal.email/create para crear mails aleatorios
     * //SMTP: es un protocolo TCP/IP que se utiliza para enviar y recibir correo electrónico.
     * //Para gmail se necesita verificación de 2 pasos y luego crear contraseña para aplicaciones
**/
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
            user: 'filomena92@ethereal.email',
            pass: 'gj8agmqWjkdeS3VV9q'
        }
        });
    }

    /**
     *  Envia un mail...
     * 
     * @param object mailOptions 
     * from: 'ISFT151.@ethereal.email',
     * to: 'STUDENT@ethereal.email',
     * subject: 'something',
     * text: 'something',
     * attachments:
     * [
     * {
     *      filename: 'file.pdf',
     *      path: 'path/file.pdf',
     *      contentType: 'application/pdf'
     * }
     * ]        
     * @return messageId
     **/
    async sendEmail(mailOptions)
    {
        const response = await this.transporter.sendMail(mailOptions)

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(response));

        return response.messageId;
    }
};
module.exports = { ISFT151Mailer }