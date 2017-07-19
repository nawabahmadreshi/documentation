---
type: recipe
directory: marketing-channels
title: "Facebook Platform Ads"
page_title: "Advertising with Deep Links: Facebook Ads"
description: Learn how to create Facebook ads that are powered by Branch Metrics deep links. It’s simple - configure the dashboard, generate links and set up your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Advertising, Ads, Facebook Ads, Facebook Authentication
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/facebook-platform-ads/, /features/facebook-platform-ads/overview/, /features/facebook-platform-ads/guide/, /features/facebook-ads/support/ ]
---

{% if page.overview %}

Branch links can be used together with a variety of Facebook ads, allowing you to track ad performance on the Branch dashboard and to deep link new users from ad-driven installs directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook, Instagram, and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Awareness | Brand Awareness | Cross-platform Display
Awareness | Reach | Cross-platform Display
Consideration | Video Views | Cross-platform Display
Consideration | Lead Generation | Cross-platform Search

#### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas
--- | --- | --- | --- | --- | --- | ---
Brand Awareness | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎
Reach | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎
Video Views |  | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎
Lead Generation | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  |

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

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="_blank"}'s `Create Facebook Link` button under the Facebook Partner and select `Create Display Link` or `Create Search Link` depending on your campaign type.
{% image src='/img/pages/features/facebook-ads/create-link-display.png' half center alt='Link Creation' %}
1. Pick a Link Name for later reference.
1. Configure the link the Ad Partner set to **Facebook** and the Ad Format set to **Cross-Platform Display** or **Cross-Platform Search**.
{% image src='/img/pages/features/facebook-ads/facebook-platform-ads/link-setup.png' 3-quarters center alt='Create Ad Link' %}
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

## Brand Awareness Campaign Setup

#### Configure an Ad

To set up Facebook Brand Awareness Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad. Facebook's Ad guide for Brand Awareness Campaigns is available **[here](https://www.facebook.com/business/ads-guide/brand-awareness){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Brand Awareness** as the campaign marketing objective.
{% image src='/img/pages/features/facebook-ads/facebook-platform-ads/brand-awareness/campaign-selection.png' 3-quarters center alt='Campaign Selection' %}
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Now add your Branch link to your advertisement
    - Select the `Add a Website URL` checkbox and copy your Branch Ad Link into the **Website URL** field.
    {% image src='/img/pages/features/facebook-ads/facebook-platform-ads/brand-awareness/ad-deep-link.png' 3-quarters center alt='Deep Link Placement' %}
    - If you selected to add a full screen Canvas advertisement, add your Branch Ad link as the **Destination URL** for your canvas advertisement components
1. Complete the rest of the ad campaign setup.

{% protip title="Optional: Ad formats with Multiple Links" %}

Some ad formats such as the Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

{% endprotip %}

## Reach Campaign Setup

#### Configure an Ad

To set up Facebook Reach Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad. Facebook's Ad guide for Reach Campaigns is available **[here](https://www.facebook.com/business/ads-guide/reach){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Reach** as the campaign marketing objective.
{% image src='/img/pages/features/facebook-ads/facebook-platform-ads/reach/campaign-selection.png' 3-quarters center alt='Campaign Selection' %}
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Now add your Branch link to your advertisement
    - Select the `Add a Website URL` checkbox and copy your Branch Ad Link into the **Website URL** field.
    {% image src='/img/pages/features/facebook-ads/facebook-platform-ads/reach/ad-deep-link.png' 3-quarters center alt='Deep Link Placement' %}
    - If you selected to add a full screen Canvas advertisement, add your Branch Ad link as the **Destination URL** for your canvas advertisement components
1. Complete the rest of the ad campaign setup.

{% protip title="Optional: Ad formats with Multiple Links" %}

Some ad formats such as the Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

{% endprotip %}

## Video Views Campaign Setup

#### Configure an Ad

To set up Facebook Video Views Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad. Facebook's Ad guide for Video Views Campaigns is available **[here](https://www.facebook.com/business/ads-guide/video-views/){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Video Views** as the campaign marketing objective.
{% image src='/img/pages/features/facebook-ads/facebook-platform-ads/video-views/campaign-selection.png' 3-quarters center alt='Campaign Selection' %}
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Now add your Branch link to your advertisement
    - Select the `Add a Website URL` checkbox and copy your Branch Ad Link into the **Website URL** field.
    {% image src='/img/pages/features/facebook-ads/facebook-platform-ads/video-views/ad-deep-link.png' 3-quarters center alt='Deep Link Placement' %}
    - If you selected to add a full screen Canvas advertisement, add your Branch Ad link as the **Destination URL** for your canvas advertisement components
1. Complete the rest of the ad campaign setup.

{% protip title="Optional: Ad formats with Multiple Links" %}

Some ad formats such as the Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

{% endprotip %}

## Lead Generation Campaign Setup

#### Configure an Ad

To set up Facebook Lead Generation Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad. After users fill out the lead form, they'll be directed to your website or app after through the Branch Ad link. Facebook's Ad guide for Lead Generation Campaigns is available **[here](https://www.facebook.com/business/ads-guide/lead-generation){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Lead Generation** as the campaign marketing objective.
{% image src='/img/pages/features/facebook-ads/facebook-platform-ads/lead-generation/campaign-selection.png' 3-quarters center alt='Campaign Selection' %}
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Enter the Lead form creation portal and setup your form.
1. On the final "Thank you" screen, locate and paste your Branch Ad Link into the **Website link** field.
{% image src='/img/pages/features/facebook-ads/facebook-platform-ads/lead-generation/ad-deep-link.png' 3-quarters center alt='Campaign Selection' %}
1. Complete the rest of the ad campaign setup.

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

{% ingredient fb-ads-support %}{% endingredient %}

{% endif %}
