---
type: recipe
directory: marketing-channels
title: "Ad Network Integrations"
page_title: "Advertising with Deep Links: Ad Network Integrations"
description:
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/google-search-ads/, /features/google-search-ads/overview/, /features/google-search-ads/guide/, /features/google-search-ads/support/ ]
---

{% if page.overview %}
Branch Universal Ads help you drive results for web and app campaigns. 

- Create Ad Links with tracking parameters and deep linking
- Enable Ad Partners to send them preconfigured conversion postbacks
- View ad performance with web and app analytics

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality. 
{% endprerequisite %}

## Enable an ad partner

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
1. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
{% image src="/img/pages/marketing-channels/deep-linked-ads/ads-partner-management.png" center 3-quarters alt='Ads Partner Management' %}
1. Search for the Ad Partner that you'd like to enable.
{% image src="/img/pages/marketing-channels/deep-linked-ads/find-applovin.png" center 3-quarters alt='Find your ad partner' %}
1. Enter any credentials that may be required, and click **Save and Enable** in the bottom right hand corner.
{% image src="/img/pages/marketing-channels/deep-linked-ads/save-and-enable.png" center 3-quarters alt='Save and Enable' %}

## Create an ad link

Once you've enabled an ad partner, it's time to create a tracking link. 

1. First, select an ad format. For App Install or App Engagement campaigns you'll want to select the **App Only** format. For Search or Display campaigns where the user should go to web if they don't have the app, then you should select **Cross-Platform Search** or **Cross-Platform Display**. **Product Links** are for shopping or dynamic remarketing campaigns and will take you to create a Deep Linked Product Feed. 
{% image src="/img/pages/marketing-channels/deep-linked-ads/choose-ad-format.png" center 3-quarters alt='Save and Enable' %}
1. At this point you need to name your link. Select something that will make it easy to find if you need it later. Your Ad Format and Ad Partner should be selected already, but feel free to choose one if they aren't. It's important that you select the right Ad Partner for analytics later on. Click **Configure Options** to continue.
{% image src="/img/pages/marketing-channels/deep-linked-ads/name-ad-link.png" center 3-quarters alt='Name Ad Link' %}
1. This is your chance to add deep link data and analytics tags. Analytics tags are important for later segmentation, so click the **Analytics** sub tab to add a Channel and Campaign value. 
{% image src="/img/pages/marketing-channels/deep-linked-ads/add-analytics-tags.png" center 3-quarters alt='Set Analytics Tags' %}
1. Click **Create Link Now**, and you have your tracking link! Take this link and give it to your Ad Partner's Account Manager or paste it into the tracking section of your campaign yourself.
{% image src="/img/pages/marketing-channels/deep-linked-ads/finished-ad-link.png" center 3-quarters alt='Finish Ad Link Creation' %}


{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

{% protip title="Setting Analytics tags" %}

It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to initiatives that you're launching.

{% endprotip %}

## View your data using the Branch Ads Analytics page

The [Ads Analytics Page page](https://dashboard.branch.io/ads/analytics) on the Branch dashboard shows the performance of your ad campaigns. You can view performance over time, including purchase and other custom events. 

{% elsif page.advanced %}

## Editing postbacks

Your ad partner postbacks can be found under the **Postbacks** tab 


{% elsif page.support %}

## FAQ / Debugging

Sometimes, your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

{% endif %}
