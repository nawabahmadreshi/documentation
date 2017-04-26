---
type: recipe
directory: other
title: Email Campaigns
page_title: Email campaigns with deep links
description: How to create deep links for email campaigns featuring your app. Branch Links enable deep linking, install attribution, and in-depth analytics.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, email campaigns, Quick Links
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,email campaigns, Quick Links, Android
hide_platform_selector: true
sections:
- overview
- guide
- advanced
alias: [ /features/email-campaigns/, /features/email-campaigns/overview/, /features/email-campaigns/guide/, /features/email-campaigns/advanced/ ]
---

{% if page.overview %}

You can use Branch links in email campaigns to launch your app or gracefully fall back to the App or Play Store download page. For more advanced purposes, you can even deep link users directly to content after your app opens.

{% image src='/img/pages/features/email-campaigns/email.png' half center alt='Create Quick Link' %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- To track installs from Branch links in email campaigns, you need to [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

## Create a Quick Link on the Branch dashboard

1. Visit the [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard and click **+ Add link**.
1. Pick a **Link Description** for later reference. For example: "Launch Email" {% image src='/img/pages/features/email-campaigns/add_email.png' 2-thirds center alt='Create Quick Link' %}

## Configure link analytics

**Channel** and **Campaign** are optional but recommended. **Tags** is free form. {% image src='/img/pages/features/email-campaigns/tags_email.png' 2-thirds center alt='tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Conclusion

It's that simple! The [Branch dashboard](https://dashboard.branch.io/#) will track clicks for this link based on the channel, campaign and any other tags you created. Users who have the app will be linked straight to the app, and users who don't will be taken to the App/Play Store to download it. Users who click this link on desktop will be given the option to text themselves the app

{% protip title="Creating links dynamically" %}

If you need more flexibility, you might also be interested in building links by [appending query parameters]({{base.url}}/getting-started/creating-links/other-ways/#appending-query-parameters).
{% endprotip %}

{% elsif page.advanced %}

{% ingredient disable-click-tracking %}{% endingredient %}

{% endif %}