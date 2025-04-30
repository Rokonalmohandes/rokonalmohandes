import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key provided by the user
// IMPORTANT: In a real production environment, use environment variables!
const resend = new Resend('re_FkYj7xaS_C7ydUFYhhRoKcg4qCbNWRzPJ');
const toEmail = 'info.roknalmohandes@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, contactMethod, contactId, message } = body;

    // Basic validation on server-side as well
    if (!fullName || !contactMethod || !contactId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const subject = `رسالة تواصل جديدة من ${fullName}`;
    const emailHtml = `
      <h1>رسالة تواصل جديدة</h1>
      <p><strong>الاسم الكامل:</strong> ${fullName}</p>
      <p><strong>وسيلة التواصل:</strong> ${contactMethod}</p>
      <p><strong>المعرف/الرقم:</strong> ${contactId}</p>
      <hr>
      <p><strong>نص الرسالة:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Rokn Almohandes Contact <onboarding@resend.dev>', // Must be a verified domain in Resend (using default for now)
      to: [toEmail],
      subject: subject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
    }

    console.log('Contact Email sent successfully:', data);
    return NextResponse.json({ message: 'Email sent successfully', data });

  } catch (error) {
    console.error('API Route Error:', error);
    // Check if error is an instance of Error to access message property safely
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}

