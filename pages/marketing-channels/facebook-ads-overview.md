---
type: recipe
directory: marketing-channels
title: "Facebook Ads Overview"
page_title: "Advertising with Deep Links: Facebook"
description:
hide_platform_selector: true
sections:
- overview
alias: [ /features/facebook-ads-overview/ ]
---

{% if page.overview %}

Branch links can be used together with Facebook ads, allowing you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app. Refer to [Facebook's Ad Guide](https://www.facebook.com/business/ads-guide){:target="_blank"} to learn more.

Facebook's Ad Platform supports numerous campaign types and a shared set of advertisement formats. To help you navigate Facebook's Advertisement Platform we created this guide detailing how to use Branch links in all major Facebook ad types.

This documentation supports the following Facebook Ad Campaigns:

Facebook Campaign Category | Campaign Type/Objective | Branch Documentation Link | Branch Ad Format
--- | --- | --- | ---
Awareness | Brand Awareness | **[link]({{base.url}}/marketing-channels/facebook-platform-ads/)** | Cross-platform Display
Awareness | Reach | **[link]({{base.url}}/marketing-channels/facebook-platform-ads/)** | Cross-platform Display
Consideration | Traffic | **[link]({{base.url}}/marketing-channels/facebook-conversion-ads/)** | Cross-platform Display
Consideration | App Installs | **[link]({{base.url}}/marketing-channels/facebook-app-install/)** | App Only: Installs
Consideration | Video Views | **[link]({{base.url}}/marketing-channels/facebook-platform-ads/)** | Cross-platform Display
Consideration | Lead Generation | **[link]({{base.url}}/marketing-channels/facebook-platform-ads/)** | Cross-platform Display
Conversion | Conversions | **[link]({{base.url}}/marketing-channels/facebook-conversion-ads/)** | Cross-platform Display
Conversion | Product Catalogue Sales | **[link]({{base.url}}/marketing-channels/facebook-dynamic-ads/)** | Cross-platform Product Links

{::comment}
Conversion | Store Visits | **[link]()** | Cross-platform Product Links
{:/comment}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted title='Facebook Ads: App Installs' next='features/facebook-app-install' %}{% endgetstarted %}

{% endif %}
