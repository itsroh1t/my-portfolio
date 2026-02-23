import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend instance
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend verified sender
      to: ['rohitsharma59196@gmail.com'], // ← TERA EMAIL YAHAN
      replyTo: email, // User ka email — directly reply kar sakta hai
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #3b82f6; border-bottom: 3px solid #8b5cf6; padding-bottom: 10px;">
            📩 New Contact Form Message
          </h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>From:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
            
            <h3 style="color: #1f2937; margin-bottom: 10px;">Message:</h3>
            <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
            Sent from your portfolio website contact form
          </p>
        </div>
      `,
    });

    console.log('Email sent successfully:', data);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}