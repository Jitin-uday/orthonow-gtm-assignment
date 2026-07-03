# GTM Event Schema – OrthoNow

## Overview

This document defines the Google Tag Manager (GTM) event tracking plan for the OrthoNow website. The implementation is designed for GA4 reporting, Funnel Exploration, audience creation, and Google Ads conversion tracking.

---

## Event Tracking Schema

| Event Name | GTM Trigger Type | Key Parameters | GA4 Report / Audience |
|------------|------------------|----------------|------------------------|
| booking_form_start | Custom Event | clinic_location, specialty, session_id | Funnel Entry |
| booking_step_complete | Custom Event | step_number, step_name, clinic_location, specialty | Funnel Exploration |
| booking_completed | Custom Event | booking_id, clinic_location, specialty, appointment_date | Conversions |
| call_now_click | Click (tel:) | phone_number, page_location, clinic_location | Engagement |
| whatsapp_click | Click (wa.me) | page_location, clinic_location, destination_number | Engagement |
| patient_guide_form_submit | Form Submission | user_name, user_phone, guide_name | Lead Generation |
| patient_guide_download | Link Click (.pdf) | file_name, page_location, clinic_location | File Downloads |
| clinic_page_view | Page View | clinic_location, page_path, page_title | Landing Pages |
| blog_scroll_depth | Scroll Trigger | scroll_percent, article_title, category | Engagement |
| blog_read_complete | Scroll (90%) | article_title, reading_time, category | Content Performance |

---

# Booking Funnel Tracking

## Step 1

**Trigger:** Custom Event (`booking_step_complete`)

```json
{
  "event": "booking_step_complete",
  "step_number": 1,
  "step_name": "location_specialty_selected",
  "clinic_location": "Delhi",
  "specialty": "Orthopedics",
  "session_id": "abc123xyz"
}
```

---

## Step 2

**Trigger:** Custom Event (`booking_step_complete`)

```json
{
  "event": "booking_step_complete",
  "step_number": 2,
  "step_name": "patient_details_entered",
  "clinic_location": "Delhi",
  "specialty": "Orthopedics",
  "preferred_date": "2026-07-15",
  "session_id": "abc123xyz"
}
```

---

## Step 3

**Trigger:** Custom Event (`booking_completed`)

```json
{
  "event": "booking_completed",
  "booking_id": "BK-10045",
  "clinic_location": "Delhi",
  "specialty": "Orthopedics",
  "appointment_date": "2026-07-15",
  "lead_type": "Appointment",
  "session_id": "abc123xyz"
}
```

---

# GA4 Funnel Exploration

Configure a Funnel Exploration with the following steps:

1. **Step 1**
   - Event: `booking_step_complete`
   - Parameter: `step_number = 1`

2. **Step 2**
   - Event: `booking_step_complete`
   - Parameter: `step_number = 2`

3. **Step 3**
   - Event: `booking_completed`

This setup allows GA4 to measure:

- Funnel entry
- Step-to-step conversion rate
- Funnel drop-off
- Time to complete booking
- Breakdown by traffic source
- Device performance
- Clinic location
- Specialty

---

# Google Ads Conversion

**Primary Conversion Event**

`booking_completed`

### Reason

This event represents a confirmed appointment booking and is the closest measurement of business success. It provides the strongest optimization signal for Google Ads Smart Bidding compared with micro-conversions such as phone calls, WhatsApp clicks, or PDF downloads.

---

# Implementation Notes

- Multi-step forms cannot be tracked automatically by GTM.
- The front-end developer must implement the required `dataLayer.push()` events.
- GTM listens for these custom events and forwards them to GA4.
- Data Layer Variables should be created for all required parameters.
- GA4 Event Tags should map each parameter correctly.