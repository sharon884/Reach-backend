import nodemailer, { Transporter } from "nodemailer";

import { EmailSender } from "../../application/services/email-sender.js";
import { env } from "../../config/env.js";

export class NodemailerEmailSender implements EmailSender {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });
  }

  async sendOtp(email: string, otp: string): Promise<void> {
    await this.transporter.sendMail({
      from: env.SMTP_FROM,
      to: email,
      subject: "Reach - Email Verification OTP",
      text: `Your Reach verification OTP is ${otp}. This OTP will expire soon.`,
    });
  }
}