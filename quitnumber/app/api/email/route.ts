import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  try {
    await resend.emails.send({
      from: 'QuitNumber <hello@quitnumber.co>',
      to: email,
      subject: "You've calculated your Quit Number",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; color: #111;">
          <h2 style="margin-bottom: 8px;">Your Quit Number is saved 🎯</h2>
          <p style="color: #555;">We'll send you a monthly check-in reminder to update your MRR progress.</p>
          <p style="color: #555;">In the meantime, share your quit number with your indie hacker friends:</p>
          <a href="https://quitnumber.co" style="display: inline-block; background: #10b981; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 12px;">Visit QuitNumber →</a>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">QuitNumber · The real number. Not the optimistic one.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ ok: true }); // don't fail silently to user
  }
}
