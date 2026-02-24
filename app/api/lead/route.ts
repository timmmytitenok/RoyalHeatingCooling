import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

type LeadBody = {
  formType?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
  description?: string;
  issueDescription?: string;
  serviceAddress?: string;
  urgency?: string;
  propertyTypes?: string[];
  [key: string]: unknown;
};

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    const fromEmail = process.env.LEADS_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.LEADS_TO_EMAIL;

    if (!process.env.RESEND_API_KEY || !toEmail) {
      return NextResponse.json(
        { message: 'Server email configuration is incomplete.' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as LeadBody;

    if (!body.fullName || !body.phone || !body.email) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const formType = body.formType ?? 'Service Request';
    const details = {
      ...body,
      propertyTypes: Array.isArray(body.propertyTypes)
        ? body.propertyTypes.join(', ')
        : body.propertyTypes,
    };

    const detailRows = Object.entries(details)
      .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
      .map(
        ([key, value]) =>
          `<tr>
            <td style="padding:8px 10px;border:1px solid #e5e7eb;font-weight:600;text-transform:capitalize;">${escapeHtml(key)}</td>
            <td style="padding:8px 10px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td>
          </tr>`
      )
      .join('');

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `[Lead] ${formType}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#111827;">
          <h2 style="margin-bottom:12px;">New Lead Submission</h2>
          <p style="margin:0 0 16px;">A new request was submitted from the website.</p>
          <table style="border-collapse:collapse;width:100%;max-width:680px;">
            ${detailRows}
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead email error:', error);
    return NextResponse.json(
      { message: 'Unable to send request email.' },
      { status: 500 }
    );
  }
}
