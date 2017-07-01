---
type: recipe
directory: marketing-channels
title: "Google Video Ads"
page_title: "Advertising with Deep Links: Google Video Ads"
description:
hide_platform_selector: true
sections:
- overview
- install
- standard
- support
contents:
  number:
  - install
  - standard
alias: [ /features/google-ads/google-video-ads/, /features/google-ads/google-video-ads/overview/, /features/google-video-ads/install/, /features/google-video-ads/standard/, /features/google-ads/google-video-ads/support/ ]
---

{% if page.overview %}
If you're running Google AdWords Search Network , you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Video | Standard - Instream | Cross-platform Search
Video | Standard - Bumper | Cross-platform Search
Video | Mobile App Install - Instream | App Only: Install

#### OS Support and Major Differences

Operating System | Supported by Video Ads? | Key Differences | Documentation
--- | --- | --- | ---
Web | Yes | Uses tracking template, must redirect to Final Website | [link]({{base.url}}/marketing-channels/google-video-ads/standard)
iOS | Yes | Uses tracking template, must redirect iOS app store | [link]({{base.url}}/marketing-channels/google-video-ads/install)
Android | Yes | Uses tracking template, must redirect Google Play store | [link]({{base.url}}/marketing-channels/google-video-ads/install)

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.installs %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## Enable Google as an Ad Partner

{% ingredient enable-google-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select **Create Display Link**
{% image src='/img/pages/features/google-ads/create-link-display.png' 3-quarters center alt='Link Creation' %}
1. Under the Define Section, pick a **Link Name** for later reference
1. Configure the link with the Ad Format set to **Display** and the Ad Partner set to **Google Adwords**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-ads/google-video-ads/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Tags Section and Analytics Tags sub section additional tags can be set. `Channel` and `Campaign` are optional but recommended, while `Tags` is free form
{% image src='/img/pages/features/ads-analytics/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an Ad

To set up a Video App Install campaign, first complete the entire creation flow for the campaign and ad on Google Adwords.

1. Navigate to the Video ad to edit on the Adwords portal.
1. Select the ad and select `Edit > Change URL options`.
1. In the Change URL options window, copy and paste your Branch Ad link from the previous section into the Tracking template field and confirm the change.

{% image src="/img/pages/features/google-ads/google-video-ads/full-branch-link.png" half center alt='Example Link' %}

{% image src="/img/pages/features/google-ads/google-video-ads/install/adwords-configuration-instream.png" half center alt='Example Adwords Config' %}

{% protip %}

Because the video ad directly links to the App store to install the app, Branch links can't be used as the video link directly. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% caution title="Video Discovery Ad Support" %}

As of June 2017, Adwords does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type.

{% endcaution %}

## View Your Data using the Branch dashboard

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.standard %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## Enable Google as an Ad Partner

{% ingredient enable-google-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select **Create Display Link**
{% image src='/img/pages/features/google-ads/create-link-display.png' 3-quarters center alt='Link Creation' %}
1. Under the Define Section, pick a **Link Name** for later reference
1. Configure the link with the Ad Format set to **Display** and the Ad Partner set to **Google Adwords**, while leaving the Campaign field blank
{% image src='/img/pages/features/google-ads/google-video-ads/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Tags Section and Analytics Tags sub section additional tags can be set. `Channel` and `Campaign` are optional but recommended, while `Tags` is free form
{% image src='/img/pages/features/ads-analytics/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an Ad

To set up a Video Standard campaign, first create the campaign on Google Adwords and continue until you reach the Ad creation step.

During Ad creation follow the following procedures for Branch link tracking

1. Select your desired Video ad format and fill in the **Final URL** field with the final website URL of your ad
1. Locate the `Ad URL options (advanced)` section and expand it. Now copy your Branch Ad link from the previous step into the **Tracking Template** field.

{% image src="/img/pages/features/google-ads/google-video-ads/full-branch-link.png" half center alt='Example Link' %}

#### Instream Video Setup
{% image src="/img/pages/features/google-ads/google-video-ads/standard/adwords-configuration-instream.png" half center alt='Example Adwords Config' %}
#### Bumper Video Setup
{% image src="/img/pages/features/google-ads/google-video-ads/standard/adwords-configuration-bumper.png" half center alt='Example Adwords Config' %}

{% protip %}

Because the **Final URL** for your app install campaigns must match your final destination website, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{% endprotip %}

{% caution title="Video Discovery Ad Support" %}

As of June 2017, Adwords does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type.

{% endcaution %}

## View Your Data using the Branch dashboard

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

## FAQ / Debugging

Sometimes, your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

**Q: Why can't I use a Branch link in a Video discovery ad?**

**A:** As of June 2017, Adwords does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type. However, we're working on support in the future and will update these docs accordingly.

{% endif %}
