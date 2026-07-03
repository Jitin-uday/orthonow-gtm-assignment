# Integration Design – OrthoNow CRM Integration

## End-to-End Integration Architecture

When a patient submits the consultation form on the OrthoNow landing page, the form data (Name, Phone Number, and Clinic Preference) is first captured using JavaScript. The form submission triggers a `window.dataLayer.push()` event for Google Tag Manager (GTM), which sends the `consultation_form_submitted` event to GA4. This conversion is then imported into Google Ads so campaigns can optimize toward qualified consultation enquiries.

At the same time, the landing page sends the form data to a backend endpoint, which securely communicates with the HubSpot CRM API. I would use the **HubSpot CRM API** instead of the native HubSpot form embed because the landing page is custom-built and requires full control over the submission process and integrations.

Since the form does not collect an email address, I would **not rely on HubSpot’s default deduplication**, which works primarily on email. Instead, the backend would first search HubSpot using the **phone number** through the CRM Search API. If a contact with the same phone number exists, it updates the existing contact. Otherwise, it creates a new contact with the following properties:

- Name
- Phone Number
- Clinic Preference
- Source = Google Ads – Consultation Landing Page
- Lead Status = New Enquiry

After HubSpot confirms a successful create or update, the backend immediately sends the patient's details to the **Karix WhatsApp Business API**. Karix then delivers an automated confirmation message to the patient within two minutes.

## Biggest Failure Point

The biggest failure point is **phone number deduplication**. Since HubSpot does not automatically deduplicate contacts based on phone numbers, duplicate patient records could be created if multiple submissions use the same phone number. To prevent this, every submission first performs a phone-number search using the HubSpot CRM Search API before creating a contact. If a matching phone number exists, the existing contact is updated instead of creating a duplicate.

## WhatsApp SLA Monitoring

The two-minute WhatsApp SLA could fail because of API downtime, network issues, backend failures, or delays from the WhatsApp provider (Karix). To maintain the SLA, I would implement automatic retries with exponential backoff, maintain detailed API logs, and monitor delivery status using Karix delivery reports. If a message is not delivered within two minutes, an automated Slack or email alert would notify the support team so the issue can be investigated immediately.