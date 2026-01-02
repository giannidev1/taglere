import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { Client as HubSpotClient } from '@hubspot/api-client';
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { AssociationSpecAssociationCategoryEnum } from '@hubspot/api-client/lib/codegen/crm/objects/notes';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to parse name into first and last name
function parseName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  return { firstName, lastName };
}

// Email template for Gianni (lead notification)
function getLeadNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  propertyAddress?: string;
  message?: string;
}) {
  // Debug: Log what the email template receives
  console.log('Email template received:', data);
  console.log('Has propertyAddress?', !!data.propertyAddress, '|', data.propertyAddress);
  console.log('Has message?', !!data.message, '|', data.message);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #0a1628 0%, #0f1f35 100%);
      color: #c9a962;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #c9a962;
    }
    .content {
      background: #fff;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .field {
      margin-bottom: 20px;
    }
    .label {
      font-weight: 600;
      color: #0a1628;
      margin-bottom: 5px;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.5px;
    }
    .value {
      color: #333;
      font-size: 16px;
    }
    .message-box {
      background: #f9fafb;
      padding: 15px;
      border-left: 3px solid #c9a962;
      margin-top: 10px;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🏡 New Lead from taglere.com</h1>
  </div>
  <div class="content">
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${data.name}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
    </div>
    <div class="field">
      <div class="label">Phone</div>
      <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
    </div>
    ${data.propertyAddress ? `
    <div class="field">
      <div class="label">Property Address</div>
      <div class="value">${data.propertyAddress}</div>
    </div>
    ` : ''}
    ${data.message ? `
    <div class="field">
      <div class="label">Message</div>
      <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
    </div>
    ` : ''}
  </div>
  <div class="footer">
    <p>Received from taglere.com contact form</p>
  </div>
</body>
</html>
  `.trim();
}

// Email template for lead (confirmation)
function getLeadConfirmationEmail(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #0a1628 0%, #0f1f35 100%);
      padding: 40px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #c9a962;
      margin-bottom: 10px;
    }
    .tagline {
      color: #e8dcc4;
      font-size: 14px;
    }
    .content {
      background: #fff;
      padding: 40px 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .greeting {
      font-size: 20px;
      color: #0a1628;
      margin-bottom: 20px;
    }
    .message {
      color: #4b5563;
      font-size: 16px;
      line-height: 1.8;
      margin-bottom: 15px;
    }
    .highlight {
      background: #fef3c7;
      padding: 20px;
      border-radius: 8px;
      margin: 25px 0;
      text-align: center;
    }
    .highlight-text {
      font-size: 18px;
      color: #0a1628;
      font-weight: 600;
    }
    .signature {
      margin-top: 30px;
      color: #0a1628;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 14px;
      border-top: 1px solid #e5e7eb;
    }
    .contact-info {
      margin-top: 15px;
    }
    .contact-info a {
      color: #c9a962;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Tagle RE</div>
    <div class="tagline">0.5% Full-Service Real Estate</div>
  </div>
  <div class="content">
    <div class="greeting">Hi ${name},</div>
    <div class="message">
      Thank you for reaching out! I received your message and I'm excited to learn more about your real estate needs.
    </div>
    <div class="highlight">
      <div class="highlight-text">I'll be in touch within 24 hours</div>
    </div>
    <div class="message">
      As San Diego's only 0.5% full-service brokerage, I'm committed to helping you keep more of your equity while receiving expert guidance, professional marketing, and skilled negotiation.
    </div>
    <div class="message">
      In the meantime, feel free to call or text me directly if you have any urgent questions.
    </div>
    <div class="signature">
      <strong>Gianni Tagle</strong><br>
      Licensed Real Estate Broker<br>
      Tagle Real Estate
    </div>
    <div class="contact-info">
      <a href="tel:6193636347">(619) 363-6347</a> |
      <a href="mailto:gianni@taglere.com">gianni@taglere.com</a>
    </div>
  </div>
  <div class="footer">
    <p>Tagle Real Estate | San Diego County</p>
    <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
      DRE #02250353
    </p>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    // Debug: Check if API key is loaded
    console.log('API Key loaded:', !!process.env.RESEND_API_KEY);
    console.log('API Key prefix:', process.env.RESEND_API_KEY?.substring(0, 7));

    const body = await request.json();
    const { name, email, phone, propertyAddress, message } = body;

    // Debug: Log received data
    console.log('Received form data:', { name, email, phone, propertyAddress, message });

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Debug: Log data being sent to email template
    console.log('Data for email template:', {
      name,
      email,
      phone,
      propertyAddress,
      message,
    });

    // Send email to Gianni (lead notification)
    const leadNotification = await resend.emails.send({
      from: 'Tagle RE Website <updates@updates.taglere.com>',
      to: 'gianni@taglere.com',
      replyTo: email,
      subject: `New Lead from taglere.com: ${name}`,
      html: getLeadNotificationEmail({
        name,
        email,
        phone,
        propertyAddress,
        message,
      }),
    });
    console.log('Notification response:', leadNotification);

    // Send confirmation email to the lead
    const leadConfirmation = await resend.emails.send({
      from: 'Tagle Real Estate <updates@updates.taglere.com>',
      to: email,
      replyTo: 'gianni@taglere.com',
      subject: 'Thanks for reaching out to Tagle Real Estate',
      html: getLeadConfirmationEmail(name),
    });
    console.log('Confirmation response:', leadConfirmation);

    console.log('Emails sent successfully:', {
      notification: leadNotification.data?.id,
      confirmation: leadConfirmation.data?.id,
    });

    // Create/update contact in HubSpot (non-blocking)
    try {
      if (process.env.HUBSPOT_ACCESS_TOKEN) {
        const hubspotClient = new HubSpotClient({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });
        const { firstName, lastName } = parseName(name);

        // Prepare contact properties
        const contactProperties: any = {
          email,
          firstname: firstName,
          lastname: lastName,
          phone,
          lead_source: 'Website - Contact Form',
        };

        // Try to create or update contact
        let contactId: string | undefined;
        try {
          // Try to create contact
          const createResponse = await hubspotClient.crm.contacts.basicApi.create({
            properties: contactProperties,
          });
          contactId = createResponse.id;
          console.log('HubSpot contact created:', contactId);
        } catch (createError: any) {
          // If contact exists, update it instead
          if (createError?.body?.category === 'CONFLICT') {
            console.log('Contact already exists, updating instead...');
            const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
              filterGroups: [
                {
                  filters: [
                    {
                      propertyName: 'email',
                      operator: FilterOperatorEnum.Eq,
                      value: email,
                    },
                  ],
                },
              ],
            });

            if (searchResponse.results && searchResponse.results.length > 0) {
              contactId = searchResponse.results[0].id;
              await hubspotClient.crm.contacts.basicApi.update(contactId, {
                properties: contactProperties,
              });
              console.log('HubSpot contact updated:', contactId);
            }
          } else {
            throw createError;
          }
        }

        // Add note with property address and message if provided
        if (contactId && (propertyAddress || message)) {
          const noteContent = [
            `**Lead submitted via Website Contact Form**`,
            `Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}`,
            propertyAddress ? `\n**Property Address:** ${propertyAddress}` : '',
            message ? `\n**Message:**\n${message}` : '',
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
                    associationCategory: AssociationSpecAssociationCategoryEnum.HubspotDefined,
                    associationTypeId: 202, // Note to Contact association
                  },
                ],
              },
            ],
          });
          console.log('HubSpot note added to contact:', contactId);
        }
      } else {
        console.log('HubSpot integration skipped: HUBSPOT_ACCESS_TOKEN not configured');
      }
    } catch (hubspotError) {
      // Log error but don't fail the request - email is more important
      console.error('HubSpot integration error (non-critical):', hubspotError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Provide more specific error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to send email. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
