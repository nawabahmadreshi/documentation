---
type: recipe
directory: marketing-channels
title: "Google Ads Overview"
page_title: "Advertising with Deep Links: Google AdWords"
description:
hide_platform_selector: true
sections:
- overview
---

{% if page.overview %}
With Branch, you can put deep links in every type of Google AdWords campaign, improving conversion rates and letting you measure the impact of your campaigns on mobile.  

The Google AdWords interface can be confusing so we've created a guide to help you find the right documentation. The new AdWords interface (released in beta in May 2017) still follows roughly the same campaign creation flow. We'll update this page as needed if the campaign creation flow is updated, or new ad types are supported.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Documentation Link | Branch Ad Format
--- | --- | --- | ---
Search Network | Mobile app installs | **[link]({{base.url}}/marketing-channels/google-search-install-ads)** | App Only: Install
Search Network | Mobile app engagement | link here | App Only: Engagement
Search Network | Standard  | link here | Cross-platform Search
Search Network | Dynamic Search Ads  | link here | Cross-platform Search
Display Network | Install your mobile app | link here | App Only: Install
Display Network | Engage with your mobile app | link here | App Only: Engagement
Display Network | Others (Visit your website, Influence, etc.)  | link here | Cross-platform Display
Video | Mobile App Installs | link here | App Only: Install
Video | Standard | link here | Cross-platform Display
Shopping | Shopping | link here | Cross-platform Product Links
Universal App Campaigns | Universal App Campaigns | link here | App Only: Install

{::comment}
Video (YouTube TrueView) | Shopping | link here | Cross-platform Product Links
{:/comment}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted title='Search Mobile App Install' next='features/google-search-install-ads' %}{% endgetstarted %}
{% endif %}
