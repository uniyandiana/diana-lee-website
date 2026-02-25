import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Integrate with your email marketing service (Mailchimp, ConvertKit, etc.)
    // Example for Mailchimp:
    /*
    const response = await fetch(
      `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      // Handle duplicate email
      if (data.title === 'Member Exists') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        );
      }
      throw new Error('Failed to subscribe');
    }
    */

    // For now, just log the email (replace with actual integration)
    console.log(`Newsletter signup: ${email}`);

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
