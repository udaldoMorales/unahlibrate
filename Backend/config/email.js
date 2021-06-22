const nodemailer = require('nodemailer');

module.exports = transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: '', //Colocar el correo que vayamos a usar.
                pass: '' //Colocar la contraseña de aplicación.
            }
        });