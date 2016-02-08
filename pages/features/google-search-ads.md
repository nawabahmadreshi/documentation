---
type: recipe
directory: features
title: "Google Search Ads"
page_title: "Advertising with Deep Links: Google Ads - Search and Display"
description: 
hide_platform_selector: true
sections:
- overview
- guide
---

{% if page.overview %}
If you're running Google AdWords campaigns, whether they're of the Search or Display variety, Branch links can be placed inside your ads. This allows you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app.

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% protip title="Google Display Network Campaigns" %}Google Display Network campaigns allow you to place Branch links and direct traffic to mobile conversions. We're in testing stages of Google Display, and will provide steps here when we have a finalized integration.
{% endprotip %}

### [Get started with Google ads!]({{base.url}}/features/google-search-ads/guide)

{% elsif page.guide %}

{% prerequisite %}

- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

## Create a Branch link

Use the [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard to create a link for your ad campaign.

{% image src="/img/pages/features/google-search-ads/add_full.png" 3-quarters center alt='Add a Branch Marketing link' %}

## Configure an ad

1. Grab your app's iTunes URL or Google Play Store URL.
1. After you've added your headline and description for the ad units, navigate to the **Final URL** and **Ad URL options** section.
1. In the **Final URL**, you will put your iTunes App Store URL, or Google Play Store URL.
1. Expand **Ad URL options**. and place your Branch link from the first step in the **Tracking template** box. No need to add any extra parameters.

{% image src="/img/pages/features/google-search-ads/link-configuration.png" half center alt='Example Ad' %}


{% protip %}
Because the **Final URL** for your app install campaigns must match your domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.
{% endprotip %}

## Finished

That's it! App installs through Google ads will now display on your Branch dashboard.

{% endif %}