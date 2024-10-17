import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Or your email provider's SMTP host
      port: 587, // Typically 587 for TLS or 465 for SSL
      secure: false, // Set to true if port is 465
      auth: {
        user: process.env.EMAIL_USER, // Your email address (from .env)
        pass: process.env.EMAIL_PASSWORD, // Your email password (from .env)
      },
    });
  }

  async sendVerificationEmail({ email, token }): Promise<void> {
    const verificationUrl = `https://yourdomain.com/verify-email?token=${token}`;

    const mailOptions = {
      from: '"Your App" <no-reply@yourdomain.com>', // Sender address
      to: email, // List of receivers
      subject: 'Verify Your Email', // Subject line
      text: `Please verify your email by clicking the link: ${verificationUrl}`,
      html: `<p>Please verify your email by clicking the link:</p><a href="${verificationUrl}">${verificationUrl}</a>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  test() {
    console.log(process.env.EMAIL_USER);

    return 'olaaaaa';
  }
}
