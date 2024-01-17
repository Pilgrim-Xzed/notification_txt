import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CONTACT_EMAIL, MAIL_PASSWORD, SITE_URL } from '@/common/constants';
import * as pdf from 'html-pdf';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import * as sgMail from '@sendgrid/mail';


@Injectable()
export class MailService {
  private siteUrl: string;
  private contactEmail: string;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    
  ) {
    this.siteUrl = configService.get(SITE_URL);
    this.contactEmail = configService.get(CONTACT_EMAIL);
    sgMail.setApiKey(configService.getOrThrow(MAIL_PASSWORD));
  }



  private async generatePdfFromHtml(html: string): Promise<Buffer> {
 
    return new Promise<Buffer>((resolve, reject) => {
      pdf.create(html, {
        format: 'Letter', // Specify the desired page format (e.g., 'A4', 'Letter', etc.)
        margin: {
          top: "40px",
          bottom: "100px",
        },
        printBackground: true, // Set zoom factor to 1 for no zoom
        timeoutSeconds: 3000, 
        childProcessOptions: {
          env: {
            OPENSSL_CONF: '/dev/null',
          },
        }
      }).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });
  }


  async sendNewTransactionEmail(to: string, context?: any) {
    const filePath =  path.join(__dirname, '../templates/invoice.hbs');
    const templete = await fs.promises.readFile(filePath, 'utf-8');
    const templateData = handlebars.compile(templete);

    const html = templateData({email:to,...context});

    
   const pdf = await this.generatePdfFromHtml(html);
  
  await sgMail.send({
    to,
    from: 'hello@io.net',
    subject: 'IO Notifications (Transaction)',
    html,
    attachments: [
      {
        content: pdf.toString('base64'),
        filename: 'invoice.pdf',
        type: 'application/pdf',
        disposition: 'attachment',
        contentId: 'invoice_pdf',
      },
    ],
  });
  }


  async sendDeviceStatusEmail(to: string, context?: any) {
    const filePath =  path.join(__dirname, '../templates/device-notification.hbs');
    const templete = await fs.promises.readFile(filePath, 'utf-8');
    const templateData = handlebars.compile(templete);

    const html = templateData({email:to,...context});
  
  await sgMail.send({
    to,
    from: 'hello@io.net',
    subject: 'IO Notifications (Device)',
    html,
    
  });
  }
 
}
