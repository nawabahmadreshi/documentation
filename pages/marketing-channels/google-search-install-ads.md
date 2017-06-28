---
type: recipe
directory: marketing-channels
title: "Google Search Install Ads"
page_title: "Advertising with Deep Links: Google Search Install Ads"
description:
hide_platform_selector: true
sections:
- overview
- ios
- android
- support
alias: [ /features/google-search-ads/, /features/google-search-ads/overview/, /features/google-search-ads/guide/, /features/google-search-ads/support/ ]
---

{% if page.overview %}
If you're running Google AdWords Search Install Campaigns, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Search Network | Mobile app installs | App Only: Install

#### OS Support and major differences

Operating System | Supported by AdWords Search Install Ads? | Key differences | Documentation
--- | --- | --- | ---
iOS | Yes | Uses tracking template, must redirect iOS app store | [link]({{base.url}}/marketing-channels/google-search-install-ads/ios)
Android | Yes | Uses Final URL with ValueTrack Parameters, no tracking template | [link]({{base.url}}/marketing-channels/google-search-install-ads/android)

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.ios %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## Enable Google as an Ad Partner

Add Ingredient Here

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s **Create Google Adwords Link** button under the Google Adwords Partner and select **App Install or Engagement**
{% image src='/img/pages/features/google-search-install-ads/create-adwords-link.png' 3-quarters center alt='Analytics Tags' %}
1. Under the Define Section, pick a **Link Name** for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Search Install iOS**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-search-install-ads/iOS/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Tags Section and Analytics Tags sub section additional tags can be set. **Channel** and **Campaign** are optional but recommended, while **Tags** is free form
{% image src='/img/pages/features/google-search-install-ads/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% example title="Use the pre-configured link" %}

If you just want to track which keywords drove installs, Branch provides a pre-configured link for you to use in the *Ad URL options* field in the step below. Simply navigate to Link Settings on the Branch dashboard, and copy and paste the value inside `AdWords URL`. You can optionally [add additional parameters]({{base.url}}/getting-started/configuring-links) to that link (such as campaign, channel, and other deep link data).

{% endexample %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an Ad

To set up a Search Network Mobile App Install Campaign on iOS, first create the campaign on Google Adwords following the instructions [here](https://support.google.com/adwords/answer/6309969?hl=en) and stopping at the Ad creation step.

During Ad creation follow the following procedures for Branch link tracking

1. Grab your app's iTunes App Store URL and fill it into the **Final URL** field of your ad setup
1. Expand the **Ad URL options**. and place your Branch Ad link from the first section in the **Tracking template** box. Ensure the copied link has the appropriate additional params (~campaign_id, ~ad_set_id, lpurl, etc.)

{% image src="/img/pages/features/google-search-install-ads/iOS/full-branch-link.png" half center alt='Example Link' %}

{% image src="/img/pages/features/google-search-install-ads/iOS/adwords-configuration.png" half center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match your domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

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
{% image src='/img/pages/features/google-search-install-ads/create-adwords-link.png' 3-quarters center alt='Analytics Tags' %}
1. Under the Define Section, pick a **Link Name** for later reference
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Search Install Android**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-search-install-ads/Android/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Tags Section and Analytics Tags sub section additional tags can be set. **Channel** and **Campaign** are optional but recommended, while **Tags** is free form
{% image src='/img/pages/features/google-search-install-ads/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% example title="Use the pre-configured link" %}

If you just want to track which keywords drove installs, Branch provides a pre-configured link for you to use in the *Ad URL options* field in the step below. Simply navigate to Link Settings on the Branch dashboard, and copy and paste the value inside `AdWords URL`. You can optionally [add additional parameters]({{base.url}}/getting-started/configuring-links) to that link (such as campaign, channel, and other deep link data).

{% endexample %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an Ad

To set up a Search Network Mobile App Install Campaign on Android, first create the campaign on Google Adwords following the instructions [here](https://support.google.com/adwords/answer/6309969?hl=en) and stop at the Ad creation step

During Ad creation follow the following procedures for Branch link tracking

1. Copy the Branch Ad link from the first section and ensure that it is in the format below
{% image src="/img/pages/features/google-search-install-ads/Android/full-branch-link.png" half center alt='Example Link' %}
1. Paste this Ad link into the Final URL field

{% image src="/img/pages/features/google-search-install-ads/Android/adwords-configuration.png" half center alt='Example Ad' %}

{% protip title="Using the Final URL"%}

Because of the Adwords implementation for Search Network Mobile App Install Campaigns on Android, the Tracking Template currently does not work. Therefore, a unique Play Store link is used which corresponds to a Branch link. All install capturing and deep linking of content is still possible through this setup.

{% endprotip %}

{% caution title="Limited Click Attribution" %}

Due to the current Adwords Search Network Mobile App Install Campaign implementation, *Android Click attribution* is only measured when a user installs the mobile application.

{% endcaution %}

## View your data using the Branch dashboard

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

## FAQ / Debugging

Sometimes, your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

{% caution title="Limited Click Attribution" %}

Due to the current Adwords Search Network Mobile App Install Campaign implementation, *Android Click attribution* is only measured when a user installs the mobile application.

{% endcaution %}

{% endif %}
