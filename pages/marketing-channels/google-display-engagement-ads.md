---
type: recipe
directory: marketing-channels
title: "Google Display Engagement Ads"
page_title: "Advertising with Deep Links: Google Display Engagement Ads"
description:
hide_platform_selector: true
sections:
- overview
- ios
- android
- support
alias: [ /features/google-ads/google-display-engagement-ads/, /features/google-ads/google-display-engagement-ads/overview/, /features/google-display-engagement-ads/ios/, /features/google-display-engagement-ads/android/, /features/google-ads/google-display-engagement-ads/support/ ]
---

{% if page.overview %}
If you're running Google AdWords Display Mobile Engagement Campaigns, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Display Network | Mobile App Engagement | App Only: Engagement

#### OS Support and Major Differences

Operating System | Supported by AdWords Display Engagement Ads? | Key Differences | Documentation
--- | --- | --- | ---
iOS | Yes | Uses tracking template, must redirect iOS app store | [link]({{base.url}}/marketing-channels/google-display-engagement-ads/ios)
Android | Yes | Uses tracking template, must redirect Google Play store | [link]({{base.url}}/marketing-channels/google-display-engagement-ads/android)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.ios %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## Enable Google as an Ad Partner

TODO: Add Ingredient Here

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s **Create Google Adwords Link** button under the Google Adwords Partner and select **App Install or Engagement**
{% image src='/img/pages/features/google-ads/create-link-install-engagement.png' 3-quarters center alt='Link Creation' %}
1. Under the Define Section, pick a **Link Name** for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Display App Engagement iOS**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-ads/google-display-engagement-ads/iOS/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Tags Section and Analytics Tags sub section additional tags can be set. `Channel` and `Campaign` are optional but recommended, while `Tags` is free form
{% image src='/img/pages/features/ads-analytics/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% example title="Use the pre-configured link" %}

If you just want to track which keywords drove installs, Branch provides a pre-configured link for you to use in the *Ad URL options* field in the step below. Simply navigate to Link Settings on the Branch dashboard, and copy and paste the value inside `AdWords URL`. You can optionally [add additional parameters]({{base.url}}/getting-started/configuring-links) to that link (such as campaign, channel, and other deep link data).

{% endexample %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an Ad

To set up a Display Network Mobile App Engagement Campaign on iOS, first create the campaign on Google Adwords following the instructions [here](https://support.google.com/adwords/answer/6310670?hl=en) and stop at the Ad creation step.

During Ad creation follow the following procedures for Branch link tracking

1. Copy your Branch Ad Link from the last section and ensure the copied link has the appropriate additional params (~campaign_id, ~ad_set_id, lpurl, etc.)
1. Paste the link into the **Direct link** field of the ad creator

{% image src="/img/pages/features/google-ads/google-display-engagement-ads/iOS/full-branch-link.png" half center alt='Example Link' %}

{% image src="/img/pages/features/google-ads/google-display-engagement-ads/iOS/adwords-configuration.png" half center alt='Example Adwords Config' %}

## View Your Data using the Branch dashboard

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.android %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## Enable Google as an Ad Partner

Add Ingredient Here

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s **Create Google Adwords Link** button under the Google Adwords Partner and select **App Install or Engagement**
{% image src='/img/pages/features/google-ads/google-display-engagement-ads/create-adwords-link.png' 3-quarters center alt='Analytics Tags' %}
1. Under the Define Section, pick a **Link Name** for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Display App Engagement Android**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-ads/google-display-engagement-ads/Android/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Tags Section and Analytics Tags sub section additional tags can be set. `Channel` and `Campaign` are optional but recommended, while `Tags` is free form
{% image src='/img/pages/features/google-ads/google-display-engagement-ads/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% example title="Use the pre-configured link" %}

If you just want to track which keywords drove installs, Branch provides a pre-configured link for you to use in the *Ad URL options* field in the step below. Simply navigate to Link Settings on the Branch dashboard, and copy and paste the value inside `AdWords URL`. You can optionally [add additional parameters]({{base.url}}/getting-started/configuring-links) to that link (such as campaign, channel, and other deep link data).

{% endexample %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an Ad

To set up a Display Network Mobile App Install Campaign on iOS, first create the campaign on Google Adwords following the instructions [here](https://support.google.com/adwords/answer/6310670?hl=en) and stop at the Ad creation step.

During Ad creation follow the following procedures for Branch link tracking

1. Copy your Branch Ad Link from the last section and ensure the copied link has the appropriate additional params (~campaign_id, ~ad_set_id, lpurl, etc.)
1. Paste the link into the **Direct link** field of the ad creator

{% image src="/img/pages/features/google-ads/google-display-engagement-ads/Android/full-branch-link.png" half center alt='Example Link' %}

{% image src="/img/pages/features/google-ads/google-display-engagement-ads/Android/adwords-configuration.png" half center alt='Example Adwords Config' %}

## View your data using the Branch dashboard

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

## FAQ / Debugging

Sometimes, your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

{% endif %}
