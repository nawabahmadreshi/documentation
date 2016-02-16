---
type: recipe
directory: third-party-integrations
title: "Adjust"
page_title: Use Branch and Adjust together
description: Learn what needs to be done in order to put a Branch deep link in between a third party ad network and a third party measurement service.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Ad Measurement, third party ad measurement, ad network
hide_platform_selector: true
sections:
- overview
- guide
---

{% if page.overview %}
You can insert a Branch link **between** a third-party ad network and an analytics tool like [Adjust](https://www.adjust.com).

_Ad network ⇨ **Branch** ⇨ analytics tool (Adjust)_

This is useful when you want to make use of the attribution and analytics tools offered by Adjust, while still benefiting from tracking and deep linking by Branch.

1. Users who click on an ad and **do not** have your app installed will be sent through Branch to Adjust, and then sent by Adjust to download your app. After downloading, you will still be able to access your Branch link data as usual.
1. You may choose whether Branch sends users who **already have your app** to Adjust, or simply routes them directly to your app.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- For this feature to work as expected, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## Create a Marketing link on the Branch dashboard

1. Visit the [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard and click **+ Add link**.
1. Pick a **Marketing Title** for later reference. For example: "Ad for blue sneakers" {% image src='/img/pages/third-party-integrations/adjust-webhook/ad_example_create.png' 3-quarters center alt='Create Marketing Link' %}
1. **Channel** and **Campaign** are optional but recommended. **Tags** is free form.

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Send redirected link traffic to Adjust

You need to point the iOS and Android Custom Redirects of your Branch link to Adjust. Your previous Adjust links probably looked something like this:

| Platform | URL
| --- | ---
| **iOS** | https://app.adjust.io/abc123?campaign={campaign_id}&adgroup={creative_id}
| **Android** | https://app.adjust.io/abc123?campaign={campaign_id}&adgroup={creative_id}

Take the base URL (everything before the `?`) and set the Custom Redirects of your Branch link as follows. This tells Branch where to send users for the specific OS. Any additional query parameters (everything after `?`) will be carried through Branch automatically.

| Platform | URL
| --- | ---
| **Android URL** | https://app.adjust.io/abc123
| **iOS URL** | https://app.adjust.io/abc123

{% image src='/img/pages/third-party-integrations/adjust-webhook/custom_redirect_configuration.png' 2-thirds center alt='Custom redirect configuration' %}

{% protip %}
Note that by default these redirects only come into play if the user does **not** have the app installed. If you want **all** users (including those with the app already installed) to pass through Adjust, set the `has_app` [control parameter]({{base-url}}/getting-started/configuring-links/guide/#appending-query-parameters-to-links) of your link to `false`.
{% endprotip %}

## Provide Branch link to advertiser

Now you simply deliver your Branch link to the advertising network. You probably are used to a templated link something like this:

`https://app.adjust.io/abc123?campaign={campaign_id}&adgroup={creative_id}`

Instead, just replace the base URL (everything before the `?`), with your Branch link:

`https://bnc.lt/l/125AdD-F?campaign={campaign_id}&adgroup={creative_id}`

**This is the link to provide to your ad partner.**

{% endif %}