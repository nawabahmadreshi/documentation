---
type: recipe
directory: next-steps
title: Deep Linked Emails
page_title: Set up Deep Linked Emails
description: Branch has partnered with several ESPs to provide a deep link solution which supports Universal Links into the app while preserving click tracking.
is_premium: true
hide_platform_selector: true
hide_section_selector: true
---
**Estimated Time To Complete:**

1-3 Hours (Depending on the complexity of your email templates)

**Required Personnel:**

Email Marketing Rep (Updating Email Templates)
Mobile Developer (Making possible app changes)

**Requires An App Update:**

No* (Depends on your ESP)

## Overview

Currently, email clicks on mobile send users to the mobile web where context is lost and the user experience is broken. Branch has partnered with a number of Email Service Providers to come up with a solution. Powered by Branch’s Deep Linked Email solution, your users are going to be linked directly to content within the app where they are twice as likely to engage.

{% protip title="Check It Out"%}
[Check out](https://blog.branch.io/how-instacart-improved-their-conversion-rate-by-6x-on-mobile/) how Instacart increased the conversion rate of their emails by 6x with Branch's Deep Linked Email solution.
{% endprotip %}

### After this…
- You’ll be able to update your existing and future email templates to be fully Branch-ified.
- You’ll be able to send email campaigns through your ESP that will be able to deep link and give you proper click tracking.

## Important Information

Your email templates contain URLs to various pieces of content within your application. Branch needs to be able to determine, based on those URLs, what information is needed for your app to be able to deep link to that content. Part of the setup process for each ESP is determining how Branch can obtain this information. This is the [routing logic]({{base.url}}/basic-setup/before-getting-started/) that was set up earlier. We will likely either be pulling this information from the URL itself (from the path or query parameters) or from data embedded on the page ([Hosted Deep Link Data]({{base.url}}/basic-setup/setup-web-sdk/#hosted-deep-link-data) or Facebook App Link tags).

## Get Started

Choose your ESP from one of our partners below:

<h3 style="margin-top:0;"><a href="{{base.url}}/third-party-integrations/responsys/overview" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;"><br class="visible-md"><strong>Responsys</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>

<h3 style="margin-top:0;"><a href="{{base.url}}/third-party-integrations/salesforce/overview" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;"><br class="visible-md"><strong>Salesforce Marketing Cloud</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>

<h3 style="margin-top:0;"><a href="{{base.url}}/third-party-integrations/sendgrid/overview" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;"><br class="visible-md"><strong>Sendgrid</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>

<h3 style="margin-top:0;"><a href="{{base.url}}/third-party-integrations/sailthru/overview" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;"><br class="visible-md"><strong>Sailthru</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>

<h3 style="margin-top:0;"><a href="{{base.url}}/third-party-integrations/appboy-with-sendgrid/overview" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;"><br class="visible-md"><strong>Appboy with Sendgrid</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>