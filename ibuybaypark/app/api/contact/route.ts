import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { Client as HubSpotClient } from '@hubspot/api-client';
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { AssociationSpecAssociationCategoryEnum } from '@hubspot/api-client/lib/codegen/crm/objects/notes';
import { SITE, HUBSPOT_LEAD_SOURCE } from '@/lib/site';
import {
  CONDITION_OPTIONS,
  TIMELINE_OPTIONS,
  isValidCondition,
  isValidTimeline,
  labelFor,
} from '@/lib/leadForm';

/**
 * Constructed per request, not at module scope: the Resend SDK throws on a
 * missing key, and at module scope that turns a missing env var into a hard
 * build failure during Next's page-data collection.
 */
function getResendClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM_NOTIFICATION = `${SITE.name} Website <updates@${SITE.emailFromDomain}>`;
const FROM_CONFIRMATION = `${SITE.ownerName} <updates@${SITE.emailFromDomain}>`;

interface NormalisedLead {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  timelineLabel: string;
  conditionLabel: string;
  message?: string;
}

function parseName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

/** Escapes user-supplied text before it goes into an HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_BASE_STYLES = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .content {
    background: #fff;
    padding: 30px;
    border: 1px solid #e5e7eb;
    border-top: none;
  }
  .field { margin-bottom: 20px; }
  .label {
    font-weight: 600;
    color: #0e2a3a;
    margin-bottom: 5px;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
  }
  .value { color: #333; font-size: 16px; }
  .footer {
    text-align: center;
    padding: 20px;
    color: #6b7280;
    font-size: 14px;
  }
`;

function getLeadNotificationEmail(lead: NormalisedLead) {
  const optional = (label: string, value?: string) =>
    value
      ? `<div class="field"><div class="label">${label}</div><div class="value">${escapeHtml(
          value
        )}</div></div>`
      : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${EMAIL_BASE_STYLES}
    .header {
      background: linear-gradient(135deg, #0e2a3a 0%, #16394d 100%);
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 { margin: 0; font-size: 22px; color: #e08b4c; }
    .highlight {
      background: #fdf3ea;
      border-left: 3px solid #e08b4c;
      padding: 15px;
      border-radius: 4px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>New cash offer request — ${escapeHtml(SITE.domain)}</h1>
  </div>
  <div class="content">
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${escapeHtml(lead.name)}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(
    lead.email
  )}</a></div>
    </div>
    <div class="field">
      <div class="label">Phone</div>
      <div class="value"><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(
    lead.phone
  )}</a></div>
    </div>
    <div class="field">
      <div class="label">Property address</div>
      <div class="value">${escapeHtml(lead.propertyAddress)}</div>
    </div>
    ${optional('Timeline', lead.timelineLabel)}
    ${optional('Condition', lead.conditionLabel)}
    ${
      lead.message
        ? `<div class="field"><div class="label">Notes</div><div class="highlight">${escapeHtml(
            lead.message
          ).replace(/\n/g, '<br>')}</div></div>`
        : ''
    }
  </div>
  <div class="footer">
    <p>Submitted from the ${escapeHtml(SITE.domain)} offer form</p>
  </div>
</body>
</html>
  `.trim();
}

function getLeadConfirmationEmail(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${EMAIL_BASE_STYLES}
    .header {
      background: linear-gradient(135deg, #0e2a3a 0%, #16394d 100%);
      padding: 40px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo { font-size: 30px; font-weight: 700; color: #ffffff; margin-bottom: 10px; }
    .logo span { color: #e08b4c; }
    .tagline { color: #f5d9bf; font-size: 14px; }
    .greeting { font-size: 20px; color: #0e2a3a; margin-bottom: 20px; }
    .message { color: #4b5563; font-size: 16px; line-height: 1.8; margin-bottom: 15px; }
    .highlight {
      background: #fdf3ea;
      padding: 20px;
      border-radius: 8px;
      margin: 25px 0;
      text-align: center;
    }
    .highlight-text { font-size: 18px; color: #0e2a3a; font-weight: 600; }
    .signature { margin-top: 30px; color: #0e2a3a; }
    .contact-info { margin-top: 15px; }
    .contact-info a { color: #a3551f; text-decoration: none; }
    .disclosure {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 10px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">I Buy <span>Bay Park</span></div>
    <div class="tagline">Cash offers on Bay Park homes</div>
  </div>
  <div class="content">
    <div class="greeting">Hi ${escapeHtml(name)},</div>
    <div class="message">
      Thanks for reaching out — I&rsquo;ve got your details and I&rsquo;ll take a look at your
      property right away.
    </div>
    <div class="highlight">
      <div class="highlight-text">I&rsquo;ll be in touch within one business day</div>
    </div>
    <div class="message">
      The next step is simple: I&rsquo;ll come and walk the property at a time that suits you,
      then put a cash offer in writing. There&rsquo;s no commission, you don&rsquo;t need to fix
      or clean anything, and you pick the closing date. If you&rsquo;d rather talk it through
      first, just call or text me.
    </div>
    <div class="message">
      And to be straight with you: a cash sale isn&rsquo;t the right answer for every seller. If
      I think listing your home would genuinely net you more, I&rsquo;ll tell you.
    </div>
    <div class="signature">
      <strong>${escapeHtml(SITE.ownerName)}</strong><br>
      ${escapeHtml(SITE.ownerTitle)}<br>
      ${escapeHtml(SITE.name)}
    </div>
    <div class="contact-info">
      <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a> |
      <a href="mailto:${SITE.email}">${SITE.email}</a>
    </div>
  </div>
  <div class="footer">
    <p>${escapeHtml(SITE.name)} | ${escapeHtml(SITE.neighborhood)}, ${escapeHtml(
    SITE.city
  )}</p>
    <p class="disclosure">
      ${escapeHtml(SITE.ownerName)} is a licensed California real estate broker
      (DRE #${SITE.dreLicense}) purchasing property for his own account, and is not acting as
      your agent. If your home is currently listed with a broker, this is not a solicitation of
      that listing.
    </p>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, propertyAddress, timeline, condition, message } = body;

    if (!name || !email || !phone || !propertyAddress) {
      return NextResponse.json(
        {
          error:
            'Please fill in your name, email, phone, and the property address.',
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (!isValidTimeline(timeline) || !isValidCondition(condition)) {
      return NextResponse.json(
        { error: 'Please choose a timeline and a property condition.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        {
          error: `Email isn't configured yet. Please call ${SITE.phoneDisplay} instead.`,
        },
        { status: 500 }
      );
    }

    const lead: NormalisedLead = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      propertyAddress: String(propertyAddress).trim(),
      timelineLabel: labelFor(TIMELINE_OPTIONS, timeline),
      conditionLabel: labelFor(CONDITION_OPTIONS, condition),
      message: message ? String(message).trim() : undefined,
    };

    const resend = getResendClient();

    // Notify Gianni.
    const leadNotification = await resend.emails.send({
      from: FROM_NOTIFICATION,
      to: SITE.email,
      replyTo: lead.email,
      subject: `New Bay Park cash offer request: ${lead.name}`,
      html: getLeadNotificationEmail(lead),
    });

    // Confirm to the seller.
    const leadConfirmation = await resend.emails.send({
      from: FROM_CONFIRMATION,
      to: lead.email,
      replyTo: SITE.email,
      subject: `Thanks — I'll be in touch about your Bay Park home`,
      html: getLeadConfirmationEmail(lead.name),
    });

    // IDs only. Never log the submitter's details or any part of an API key —
    // Vercel function logs are not the place for either.
    console.log('Lead emails sent', {
      notification: leadNotification.data?.id,
      confirmation: leadConfirmation.data?.id,
    });

    // HubSpot is best-effort — a CRM failure must not lose the lead, since the
    // emails above have already gone out.
    try {
      if (process.env.HUBSPOT_ACCESS_TOKEN) {
        const hubspotClient = new HubSpotClient({
          accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
        });
        const { firstName, lastName } = parseName(lead.name);

        const contactProperties: Record<string, string> = {
          email: lead.email,
          firstname: firstName,
          lastname: lastName,
          phone: lead.phone,
          lead_source: HUBSPOT_LEAD_SOURCE,
        };

        let contactId: string | undefined;
        try {
          const createResponse = await hubspotClient.crm.contacts.basicApi.create({
            properties: contactProperties,
          });
          contactId = createResponse.id;
        } catch (createError: unknown) {
          const category = (createError as { body?: { category?: string } })?.body?.category;
          if (category === 'CONFLICT') {
            // Contact already exists — find it and update instead.
            const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
              filterGroups: [
                {
                  filters: [
                    {
                      propertyName: 'email',
                      operator: FilterOperatorEnum.Eq,
                      value: lead.email,
                    },
                  ],
                },
              ],
            });

            if (searchResponse.results?.length) {
              contactId = searchResponse.results[0].id;
              await hubspotClient.crm.contacts.basicApi.update(contactId, {
                properties: contactProperties,
              });
            }
          } else {
            throw createError;
          }
        }

        if (contactId) {
          const noteContent = [
            '**Cash offer request via ibuybaypark.com**',
            `Timestamp: ${new Date().toLocaleString('en-US', {
              timeZone: 'America/Los_Angeles',
            })}`,
            `\n**Property address:** ${lead.propertyAddress}`,
            `**Timeline:** ${lead.timelineLabel}`,
            `**Condition:** ${lead.conditionLabel}`,
            lead.message ? `\n**Notes:**\n${lead.message}` : '',
          ]
            .filter(Boolean)
            .join('\n');

          await hubspotClient.crm.objects.notes.basicApi.create({
            properties: {
              hs_timestamp: new Date().toISOString(),
              hs_note_body: noteContent,
            },
            associations: [
              {
                to: { id: contactId },
                types: [
                  {
                    associationCategory:
                      AssociationSpecAssociationCategoryEnum.HubspotDefined,
                    associationTypeId: 202, // Note → Contact
                  },
                ],
              },
            ],
          });
        }
      }
    } catch (hubspotError) {
      console.error('HubSpot sync failed (non-critical)', hubspotError);
    }

    return NextResponse.json(
      { success: true, message: 'Your request has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to process lead', error);

    return NextResponse.json(
      {
        error: `Something went wrong sending your request. Please try again, or call ${SITE.phoneDisplay}.`,
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : undefined,
      },
      { status: 500 }
    );
  }
}
