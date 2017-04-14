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
- support
---

{% if page.overview %}
If you're running Google AdWords campaigns, whether they're of the Search or Display variety, Branch links can be placed inside your ads. This allows you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app.

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## Create a Quick Link on the Branch dashboard

1. Visit the [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard and click **+ Add link**.
1. Pick a **Marketing Title** for later reference. For example: "Ad for blue sneakers" {% image src='/img/pages/features/google-search-ads/ad_example_create.png' 3-quarters center alt='Create Quick Link' %}
1. **Channel** and **Campaign** are optional but recommended. **Tags** is free form.

{% example title="Use the pre-configured link" %}

If you just want to track which keywords drove installs, Branch provides a pre-configured link for you to use in the *Ad URL options* field in the step below. Simply navigate to Link Settings on the Branch dashboard, and copy and paste the value inside `AdWords URL`. You can optionally [add additional parameters]({{base.url}}/getting-started/configuring-links) to that link (such as campaign, channel, and other deep link data).

{% endexample %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Configure an ad

1. Grab your app's iTunes URL or Google Play Store URL.
1. After you've added your headline and description for the ad units, navigate to the **Final URL** and **Ad URL options** section.
1. In the **Final URL**, you will put your iTunes App Store URL, or Google Play Store URL.
1. Expand **Ad URL options**. and place your Branch link from the first step in the **Tracking template** box. No need to add any extra parameters.

{% protip %}
If you are running **Search Install Ads** on **Android** only, you'll need to modify your Play Store URL and be on v2.6.0 of the Branch Android SDK. Simply append &referrer=google_search_install_referrer%3D<link-id> to the end of your Play Store URL, but be sure to replace <link-id> with the ID of the link created above. The Play Store URL should not have brackets, and would look like this: https://play.google.com/io.branch.branchster?referrer=google_search_install_referrer%3D123456789
{% endprotip %}

{% image src="/img/pages/features/google-search-ads/link-configuration.png" half center alt='Example Ad' %}

{% protip %}
Because the **Final URL** for your app install campaigns must match your domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.
{% endprotip %}

## View your data using the Branch dashboard

The [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard shows the performance of each individual link. You can find your link listed in the table with a quick summary of the _total_ clicks and installs.

{% image src='/img/pages/features/google-search-ads/marketing_link_row.png' full center alt='Facebook Example Ad' %}

To view more detailed stats, click the _small button that looks like a bar chart_ on the far right. Note that these stats are **limited to the date range** at the top. You can expand the range if you'd like.

{% image src='/img/pages/features/google-search-ads/click_flow_analytics.png' full center alt='Facebook Example Ad' %}

{% elsif page.support %}

## FAQ / Debugging

Sometimes, your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

{% endif %}
