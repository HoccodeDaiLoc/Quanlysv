import nodemailer from 'nodemailer';

class EmailService {
    private static instance: EmailService;

    public static getInstance(): EmailService {
        if(!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_NAME, // Thay bằng email Gmail của bạn
                pass: process.env.GMAIL_PASSWORD // Thay bằng mật khẩu ứng dụng Gmail của bạn
            }
        });
    }

    public async sendMail(to: string, subject: string, text?: string, html?: string): Promise<void> {
        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.GMAIL_NAME,
            to: to,
            subject: subject,
            text: text,
            html: html
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            throw error;
        }
    }
}

export default EmailService;
