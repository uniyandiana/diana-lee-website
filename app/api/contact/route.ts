import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Map subject codes to readable text
    const subjectMap: { [key: string]: string } = {
      'workshop': 'Workshop Enquiry',
      'one-on-one': 'One-on-One Facilitation',
      'cohort': 'Cohort Programme',
      'ecosystem': 'Ecosystem Development',
      'speaking': 'Speaking Engagement',
      'other': 'General Enquiry'
    };

    const subjectText = subjectMap[subject] || subject;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Diana Lee Website <contact@diana-lee.com>',
      to: ['contact@diana-lee.com'],
      replyTo: email,
      subject: `New Contact Form: ${subjectText}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #5A9AB4 0%, #3E7C92 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; padding: 15px; background: white; border-left: 4px solid #5A9AB4; border-radius: 4px; }
              .field-label { font-weight: bold; color: #5A9AB4; margin-bottom: 5px; }
              .field-value { color: #1f2937; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">From diana-lee.com</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">Enquiry Type:</div>
                  <div class="field-value">${subjectText}</div>
                </div>
                <div class="field">
                  <div class="field-label">Name:</div>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email:</div>
                  <div class="field-value"><a href="mailto:${email}" style="color: #5A9AB4; text-decoration: none;">${email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Message:</div>
                  <div class="field-value" style="white-space: pre-wrap;">${message}</div>
                </div>
                <div class="footer">
                  <p>This email was sent from the contact form on diana-lee.com</p>
                  <p>Reply directly to this email to respond to ${name}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully', id: data.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
