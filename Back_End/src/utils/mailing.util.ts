import nodemailer from 'nodemailer';
import { envConfig } from '../constants/config';
import ejs from 'ejs';
import path from 'path';
import { emailTemplate } from '../templates/forgotMail.template';

const { emailUser, emailPassword, emailFrom } = envConfig;
// const emailTemplatePath = path.join(__dirname, 'templates', 'forgotMail.template.ejs');
// const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: emailUser,
    pass: emailPassword
  },
  logger: true
});

export const sendEmail = async (to: string, subject: string, text: string, htmlOption?: string) => {
  console.log("🚀 ~ sendEmail ~ htmlOption:", htmlOption)
  const renderedTemplate = ejs.render(emailTemplate, { text });
  const mailOptions = {
    from: emailFrom,
    to,
    subject,
    text,
    //if html is null so html: renderedTemplate
    html: htmlOption ? htmlOption : renderedTemplate,
    headers: { 'x-myheader': 'test header' }
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.response);
};

