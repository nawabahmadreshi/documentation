---
type: recipe
title: "Adjust"
page_title: Custom Ad Network Integration
description:  Learn how to send your Branch data to your Adjust account so you can view Branch events alongside your other acquisition channels.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Ad Measurement, third party ad measurement, ad network
hide_platform_selector: true
---

# Double Sided Custom Ad Measurement Integrations

This section will describe exactly what needs to be done in order to put a Branch deep link in between a third party ad network and a third party measurement service. For example, this section applies to you if user flow chart looks like this:

_Ad network -> **Branch** -> measurement partner (Adjust, etc)_

{% ingredient dashboard_links/creating_links %}
{% override title %}## Create a marketing link{% endoverride %}
{% endingredient %}

{% ingredient dashboard_links/custom_redirects %}
{% override title %}## Customize the redirects to point to measurement partner{% endoverride %}
{% override description %}In order to configure the links for this ad network integration, you'll need to point the Branch links to the measurement partner. To do this, you'll want to customize the endpoints for both Android and iOS. Let's take the example where you were previously using Adjust with the following template:

1. **iOS:** _https://app.adjust.io/abc123??campaign={campaign_id}&adgroup={creative_id}_
1. **Android:** _https://app.adjust.io/abc123?campaign={campaign_id}&adgroup={creative_id}_

You'd set the **custom URL for Android** to _https://app.adjust.io/abc123_ and the **custom URL for iOS** to _https://app.adjust.io/abc123_. This would tell Branch where to send the user for the specific OS. Don't worry about the additional query parameters (the stuff after '?'). We'll carry that through Branch automatically.
{% endoverride %}
{% endingredient %}

## Provide link to advertiser

Click save to generate the URL - it will appear in the list of links.

Lastly, you need to deliver the proper link to the advertiser. To do this, you probably are used to sending the advertiser a link with the templated fields. For example, here is a typical link for Adjust:

_https://app.adjust.io/abc123?campaign={campaign_id}&adgroup={creative_id}_

To create the link for the advertiser, you simply need to replace the base URL (everything before the '?'), with the Branch provided link. So, keeping with the same example, you would change 'https://app.adjust.io/8x54yn' with 'https://bnc.lt/l/125AdD-F' to make the link like so:

_https://bnc.lt/l/125AdD-F?campaign={campaign_id}&adgroup={creative_id}_

This is the link to provide to the advertiser.


