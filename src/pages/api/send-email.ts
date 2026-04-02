import {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  if (req.method !== 'POST') {
    return res.status(405).json({success: false, message: 'Method not allowed'});
  }

  const {name, email, message} = req.body as ContactFormData;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({success: false, message: 'Missing required fields'});
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({success: false, message: 'Invalid email format'});
  }

  try {
    // Get environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const recipientEmail = process.env.RECIPIENT_EMAIL;

    if (!gmailUser || !gmailAppPassword || !recipientEmail) {
      console.error('Missing Gmail configuration');
      return res.status(500).json({success: false, message: 'Email service not configured'});
    }

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: gmailUser,
      to: recipientEmail,
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <h2>New Message from Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This email was sent from your portfolio contact form.</em></p>
      `,
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Optional: Send confirmation email to user
    const userMailOptions = {
      from: gmailUser,
      to: email,
      subject: 'We received your message',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>Tushar Kant Chaubey</p>
      `,
    };

    await transporter.sendMail(userMailOptions);

    return res.status(200).json({success: true, message: 'Email sent successfully'});
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({success: false, message: 'Failed to send email'});
  }
};

export default sendEmail;
