# OrthoNow GTM Event Tracking Assignment

## Overview

This project contains a proposed Google Tag Manager and GA4 event tracking implementation for OrthoNow.

The implementation covers:

- Appointment Booking Funnel
- Call Now Clicks
- WhatsApp Clicks
- Patient Guide Downloads
- Clinic Page Views
- Blog Engagement
- GA4 Funnel Exploration
- Google Ads Conversion Tracking

---

## Events Included

- booking_form_start
- booking_step_complete
- booking_completed
- call_now_click
- whatsapp_click
- patient_guide_form_submit
- patient_guide_download
- clinic_page_view
- blog_scroll_depth
- blog_read_complete

---

## Primary Conversion

booking_completed

Imported into Google Ads for Smart Bidding.

---

## Important Note

Multi-step forms cannot be tracked automatically by GTM.

The front-end developer is responsible for implementing the required dataLayer.push() events.

