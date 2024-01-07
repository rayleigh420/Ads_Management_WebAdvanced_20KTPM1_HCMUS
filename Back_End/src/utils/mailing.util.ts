import nodemailer from 'nodemailer';
import { envConfig } from '../constants/config';

const { emailUser, emailPassword, emailFrom } = envConfig;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
  logger: true
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: emailFrom,
    to,
    subject,
    text,
    html: `<p>${text}</p>`,
    headers: { 'x-myheader': 'test header' }
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.response);
}