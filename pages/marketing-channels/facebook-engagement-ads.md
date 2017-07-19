---
type: recipe
directory: marketing-channels
title: "Engagement Ads"
page_title: "Advertising with Deep Links: Facebook Ads"
description: Learn how to create Facebook ads that are powered by Branch Metrics deep links. It’s simple - configure the dashboard, generate links and set up your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Advertising, Ads, Facebook Ads, Facebook Authentication
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/facebook-engagement-ads/, /features/facebook-engagement-ads/overview/, /features/facebook-engagement-ads/guide/, /features/facebook-engagement-ads/support/ ]
---

{% if page.overview %}

Branch links can be used together with Facebook Engagement ads, allowing you to track engagement with your advertisements and ad-driven installs which deep link new users directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook, Instagram, and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Consideration | Traffic | Cross-platform Search
Conversion | Conversions | Cross-platform Search

#### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas
--- | --- | --- | --- | --- | --- | ---
Traffic | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎
Conversion | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎

{% ingredient link-to-facebook-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Facebook Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- To use Branch links in Facebook App Install Ads ensure you have Universal Links set up on iOS or App Links enabled on Android to ensure correct routing behavior. For setup, checkout [Universal and App Links]({{base.url}}/getting-started/universal-app-links).
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- To run Conversion
{% endprerequisite %}

{% ingredient enable-facebook-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="_blank"}'s `Create Facebook Link` button under the Facebook Partner and select `Create Search Link`
{% image src='/img/pages/features/facebook-ads/create-link-search.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference.
1. Configure the link with the Ad Partner set to **Facebook**, and the Ad Format set to **Cross-Platform Search**.
{% image src='/img/pages/features/facebook-ads/facebook-engagement-ads/link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android and Desktop redirects are set to the desired destinations being promoted by the ad campaign.
1. Under the Analytics Tags sub section additional tags can be set including Channel, Campaign, and freeform tags
{% image src='/img/pages/features/ads-analytics/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% caution %}

In order for your campaign to run effectively, be sure to disable Deepviews. You can either [disable Deepviews](https://dev.branch.io/features/deepviews/guide/ios/) for your entire account or [disable Deepviews for one link]({{base.url}}/features/deepviews/advanced/ios/#disabling-deepviews-for-one-link).

{% endcaution %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

{% protip title="Setting Attribution Windows" %}

You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows]({{base.url}}/marketing-channels/ad-network-integrations/advanced/#changing-attribution-windows) for instructions.

{% endprotip %}

## Traffic Campaign Setup

#### Configure an Ad

To set up a Facebook Traffic campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook Traffic Campaign information is available **[here](https://www.facebook.com/business/ads-guide/traffic){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Traffic** as the campaign marketing objective.
{% image src='/img/pages/features/facebook-ads/facebook-engagement-ads/traffic/campaign-selection.png' 3-quarters center alt='Campaign Selection' %}
1. Select either to drive traffic to your `Website` or your `App`
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Add your Branch Ad Link to your advertisement
	- If you chose to drive traffic to an App, locate the **Deep Link** field and copy and paste your Branch link there.
	{% image src='/img/pages/features/facebook-ads/facebook-engagement-ads/traffic/link-setup-app.png' 3-quarters center alt='Campaign Selection' %}
	- If you chose to drive traffic to a Website, paste your Branch Ad link into the **Website URL** field.
	{% image src='/img/pages/features/facebook-ads/facebook-engagement-ads/traffic/link-setup-web.png' 3-quarters center alt='Campaign Selection' %}
	- If you chose to drive traffic to a Website and are using a full-screen Canvas, add your Branch Ad link as the **Destination URL** for your canvas advertisement components.
1. Complete the rest of the ad campaign setup.

{% protip title="Optional: Ad formats with Multiple Links" %}

Some ad formats such as the Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

{% endprotip %}

## Conversions Campaign Setup

#### Configure an Ad

To set up a Facebook Conversions campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook Conversions Campaign information is available **[here](https://www.facebook.com/business/ads-guide/conversions){:target="_blank"}**.

{% prerequisite %}
As a prerequisite, Facebook requires you to report events about your users interacting with your content, for example: viewing, adding to cart, and purchasing. To add the Facebook Pixel to your website, and the Facebook SDK to your app, follow these instructions:

- [Sending App Events with the Facebook SDK](https://developers.facebook.com/docs/app-events){:target="_blank"}
- [Sending Web Events with the Facebook Pixel](https://developers.facebook.com/docs/marketing-api/facebook-pixel/v2.8){:target="_blank"}
{% endprerequisite %}

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Conversions** as the campaign marketing objective.
{% image src='/img/pages/features/facebook-ads/facebook-engagement-ads/conversions/campaign-selection.png' 3-quarters center alt='Campaign Selection' %}
1. Select either to have the goal of having conversions on a `Website` or in an `App`
1. Continue with campaign creation selecting audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Add your Branch Ad Link to your advertisement
	- If you chose app conversions App, locate the **Deep Link** field and copy and paste your Branch link there.
	{% image src='/img/pages/features/facebook-ads/facebook-engagement-ads/conversions/link-setup-app.png' 3-quarters center alt='Campaign Selection' %}
	- If you chose Website conversions, paste your Branch Ad link into the **Website URL** field.
	{% image src='/img/pages/features/facebook-ads/facebook-engagement-ads/conversions/link-setup-web.png' 3-quarters center alt='Campaign Selection' %}
	- If you chose Website conversions and are using a full-screen Canvas, add your Branch Ad link as the **Destination URL** for your canvas advertisement components.
1. Complete the rest of the ad campaign setup.

{% protip title="Optional: Ad formats with Multiple Links" %}

Some ad formats such as the Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

{% endprotip %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

{% ingredient fb-ads-support %}{% endingredient %}

{% endif %}
