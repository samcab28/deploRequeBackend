// SendEmail.controllers.js
const nodemailer = require('nodemailer');

// Configurar el transportador de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Luisgerardourbsalz@gmail.com', // dirección de correo electrónico de Gmail
    pass: 'mtwg lpog jssp ujni' // contraseña de aplicación
  }
});

const SendEmailCtrl = {};

// Función para enviar correos electrónicos
SendEmailCtrl.enviarCorreos = async (req, res) => {
  const { listaCorreos, asunto, mensaje } = req.body;

  try {
    // Configurar los detalles del correo electrónico
    const mailOptions = {
      from: 'Luisgerardourbsalz@gmail.com', // Tu dirección de correo electrónico de Gmail
      to: listaCorreos.join(','),
      subject: asunto,
      text: mensaje
    };

    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
    res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Se produjo un error al enviar el correo electrónico' });
  }
}

// Exportar el controlador
module.exports = SendEmailCtrl;
