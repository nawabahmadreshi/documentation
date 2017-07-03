---
type: recipe
directory: marketing-channels
title: "Google Search Engagement Ads"
page_title: "Advertising with Deep Links: Google Search Install Ads"
description:
hide_platform_selector: true
sections:
- overview
- android
- support
contents:
  number:
  - android
alias: [ /features/google-ads/google-search-engagement-ads/, /features/google-ads/google-search-engagement-ads/overview/, /features/google-ads/google-search-engagement-ads/android/, /features/google-ads/google-search-engagement-ads/support/ ]
---

{% if page.overview %}
If you're running Google AdWords Search Mobile Engagement Campaigns, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Search Network | Mobile App Engagement | App Only: Engagement

#### OS Support and Major Differences

Operating System | Supported by AdWords Search Engagement Ads? | Key differences | Documentation
--- | --- | --- | ---
iOS | No | The Search Mobile Engagement Campaign type currently does not support iOS | N/A
Android | Yes | Uses Final URL with ValueTrack Parameters, no tracking template |  [link]({{base.url}}/marketing-channels/google-search-engagement-ads/android)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.android %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ensure you have entered your Android application's URI scheme under `Link Settings > Android URI Scheme` in your Branch dashboard.
{% endprerequisite %}

{% ingredient enable-google-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select **App Install or Engagement**
{% image src='/img/pages/features/google-ads/create-link-install-engagement.png' 3-quarters center alt='Link Creation' %}
1. Under the Define Section, pick a **Link Name** for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Search App Engagement Android**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-ads/google-search-engagement-ads/Android/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Tags Section and Analytics Tags sub section additional tags can be set. `Channel` and `Campaign` are optional but recommended, while `Tags` is free form
{% image src='/img/pages/features/ads-analytics/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an Ad

To set up a Search Network Mobile App Engagement Campaign on Android, first create the campaign on Google Adwords following the instructions **[here](https://support.google.com/adwords/answer/6310671?hl=en)** and stop at the Ad creation step

During Ad creation follow the following procedures for Branch link tracking

1. Copy the Branch Ad link from the first section and ensure that it is in the format below
{% image src="/img/pages/features/google-ads/google-search-engagement-ads/Android/full-branch-link.png" half center alt='Example Link' %}
1. In the Ad creator, locate the **Scheme** field and enter the scheme portion of the Branch Ad link. This should be the portion of the link before the `://` symbol.
1. Now locate the **Host and path** field and enter the rest of your Branch Ad link following the `://` symbol.
{% image src="/img/pages/features/google-ads/google-search-engagement-ads/Android/adwords-configuration.png" half center alt='Example Ad' %}

## View your data using the Branch dashboard

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

## FAQ / Debugging

Sometimes, your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

**Q: Can I run a Adwords Search Network Mobile Engagement Campaign for iOS?**

**A:** As of June 2017, Google Adwords currently does not support this campaign type. We'll update our documentation if the campaign type gets supported in the future!

**Q: How can I test the Branch Ad link?**

**A:** On the Adwords Ad creator page or the when editing your ad, locate and click the `Test this app URI` button. With an Android phone that has your mobile app installed, use a QR code reader application to read the generated QR code to simulate a click on your Ad. Now you can verify that your Branch Ad link works and deep linked data is passed through to the app.

{% image src="/img/pages/features/google-ads/google-search-engagement-ads/Android/debug-uri.png" half center alt='Debug Link' %}

{% endif %}
