import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key provided by the user
// IMPORTANT: In a real production environment, use environment variables!
const resend = new Resend('re_FkYj7xaS_C7ydUFYhhRoKcg4qCbNWRzPJ');
const toEmail = 'info.roknalmohandes@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Destructure all fields including the new optional deliveryDate
    const { fullName, contactMethod, contactId, serviceType, serviceDetails, deliveryDate } = body;

    // Basic validation on server-side (deliveryDate is optional)
    if (!fullName || !contactMethod || !contactId || !serviceType || !serviceDetails) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const subject = `طلب خدمة جديد من ${fullName} - ${serviceType}`;
    
    // Build email HTML content, conditionally adding delivery date
    let emailHtml = `
      <h1>طلب خدمة جديد</h1>
      <p><strong>الاسم الكامل:</strong> ${fullName}</p>
      <p><strong>وسيلة التواصل:</strong> ${contactMethod}</p>
      <p><strong>المعرف/الرقم:</strong> ${contactId}</p>
      <p><strong>نوع الخدمة:</strong> ${serviceType}</p>
    `;

    // Add delivery date if provided
    if (deliveryDate) {
      emailHtml += `<p><strong>تاريخ التسليم المطلوب:</strong> ${deliveryDate}</p>`;
    }

    emailHtml += `
      <hr>
      <p><strong>تفاصيل الخدمة:</strong></p>
      <p>${serviceDetails.replace(/\n/g, '<br>')}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Rokn Almohandes <onboarding@resend.dev>', // Must be a verified domain in Resend (using default for now)
      to: [toEmail],
      subject: subject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ message: 'Email sent successfully', data });

  } catch (error) {
    console.error('API Route Error:', error);
    // Check if error is an instance of Error to access message property safely
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}

