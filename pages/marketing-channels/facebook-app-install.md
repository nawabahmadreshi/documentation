---
type: recipe
directory: marketing-channels
title: "Facebook App Install Ads"
page_title: "Advertising with Deep Links: Facebook Ads"
description: Learn how to create Facebook ads that are powered by Branch Metrics deep links. It’s simple - configure the dashboard, generate links and set up your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Advertising, Ads, Facebook Ads, Facebook Authentication
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/facebook-app-install/, /features/facebook-app-install/overview/, /features/facebook-app-install/guide/, /features/facebook-ads/support/ ]
---

{% if page.overview %}

Branch links can be used together with Facebook App Install Campaign ads, allowing you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook, Instagram, and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Consideration | App Installs | App Only: Install

#### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas
--- | --- | --- | --- | --- | --- | ---
App Installs | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎

{% ingredient link-to-facebook-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Facebook Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- To use Branch links in Facebook App Install Ads ensure you have Universal Links set up on iOS or App Links enabled on Android to ensure correct routing behavior. For setup, checkout [Universal and App Links]({{base.url}}/getting-started/universal-app-links).
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

{% ingredient enable-facebook-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="_blank"}'s `Create Facebook Link` button under the Facebook Partner and select `App Install or Engagement`
{% image src='/img/pages/features/facebook-ads/create-link-install-engagement.png' half center alt='Link Creation' %}
1. Enter a Link Name for later reference.
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Facebook**, and the Secondary Ad Format set to **App Install Ads**.
{% image src='/img/pages/features/facebook-ads/facebook-app-install/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android redirect is set to the desired app being promoted by the ad campaign.
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

## Configure an Ad

To set up a Facebook App Install campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook App Install Campaign information is available **[here](https://www.facebook.com/business/ads-guide/app-installs){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **App Installs** as the campaign marketing objective.
{% image src='/img/pages/features/facebook-ads/facebook-app-install/campaign-selection.png' 3-quarters center alt='Campaign Selection' %}
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Under the **Destination** field, you can select to direct your advertisement to the App Store or a Facebook Canvas Advertisement.
	- If you select the App Store, fill in the **Deep Link** field with your Branch Ad link
	{% image src='/img/pages/features/facebook-ads/facebook-app-install/ad-deep-link.png' 3-quarters center alt='Deep Link Placement' %}
	- If you select Canvas, add your Branch Ad link as the **Destination** Website URL for your canvas advertisement components
	{% image src='/img/pages/features/facebook-ads/facebook-app-install/facebook-canvas-setup.png' 3-quarters center alt='Canvas Setup' %}
1. Complete the rest of the ad campaign setup.

Your Facebook Ad Campaign is now setup to use Branch Links to handle App Installs!

{% protip title="Optional: Ad formats with Multiple Links" %}

Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

{% endprotip %}

{% caution %}

Facebook prevents Branch from measuring the number of clicks on their ads, so all **Clicks** numbers for Facebook App Install Ads are inaccurate.

{% endcaution %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

{% ingredient fb-ads-support %}{% endingredient %}

{% endif %}
