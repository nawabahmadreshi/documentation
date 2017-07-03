---
type: recipe
directory: marketing-channels
title: "Google Display Network Ads"
page_title: "Advertising with Deep Links: Google Display Network Ads"
description:
hide_platform_selector: true
sections:
- overview
- guide
- support
contents:
  number:
  - guide
alias: [ /features/google-ads/google-xplatform-display-ads/, /features/google-ads/google-xplatform-display-ads/overview/, /features/google-xplatform-display-ads/guide/, /features/google-ads/google-xplatform-display-ads/support/ ]
---

{% if page.overview %}
If you're running Google AdWords Display Network ads, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Display Network | Build Awareness: See your ad | Cross-platform Display
Display Network | Influence Consideration: Engage with your content | Cross-platform Display
Display Network | Influence Consideration: Visit your website | Cross-platform Display
Display Network | Drive Action: Buy on your website | Cross-platform Display
Display Network | Drive Action: Take an action on your website | Cross-platform Display

#### OS Support and Major Differences

Operating System | Supported by AdWords Display Engagement Ads? | Key Differences | Documentation
--- | --- | --- | ---
Web | Yes | Uses tracking template, must redirect to Final Website | [link]({{base.url}}/marketing-channels/google-xplatform-display-ads/guide)
iOS | Yes | Uses tracking template, must redirect iOS app store | [link]({{base.url}}/marketing-channels/google-xplatform-display-ads/guide)
Android | Yes | Uses tracking template, must redirect Google Play store | [link]({{base.url}}/marketing-channels/google-xplatform-display-ads/guide)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

{% ingredient enable-google-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select **Create Display Link**
{% image src='/img/pages/features/google-ads/create-link-display.png' 3-quarters center alt='Link Creation' %}
1. Under the Define Section, pick a **Link Name** for later reference
1. Configure the link with the Ad Format set to **Display** and the Ad Partner set to **Google Adwords**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-ads/google-xplatform-display-ads/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Tags Section and Analytics Tags sub section additional tags can be set. `Channel` and `Campaign` are optional but recommended, while `Tags` is free form
{% image src='/img/pages/features/ads-analytics/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an Ad

To set up a Display Network Mobile App Engagement Campaign on iOS, first create the campaign on Google Adwords and stop at the Ad creation step.

During Ad creation follow the following procedures for Branch link tracking

1. Enter your desired Final Website into the **Final URL** field. This should be the same website that your Branch link routes to.
1. Copy your Branch Ad Link from the last section and ensure the copied link has the appropriate additional params (~campaign_id, ~ad_set_id, lpurl, etc.) which should be automatically generated on your Branch dashboard.
1. Expand the **Advanced URL options** and paste your Branch Ad link into the **Tracking URL template** field.

{% image src="/img/pages/features/google-ads/google-xplatform-display-ads/full-branch-link.png" half center alt='Example Link' %}

{% image src="/img/pages/features/google-ads/google-xplatform-display-ads/adwords-configuration.png" half center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match your final destination website, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

## View Your Data using the Branch dashboard

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

## FAQ / Debugging

Sometimes, your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

{% endif %}
