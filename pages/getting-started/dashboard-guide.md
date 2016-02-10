---
type: recipe
directory: getting-started
title: 4. Dashboard Guide
page_title: Learn more about the Branch dashboard
description: "Learn about some basic and advanced features of the Branch dashboard"
android_description: "Learn about some advanced features of the Branch dashboard: How to set up a custom link domain and identify your best users."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, custom link domain, conversion funnel, funnels, influencers
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
contents: list
---

Now that your app is configured, it's time to dive into your data with the [Branch Dashboard](https://dashboard.branch.io)! The dashboard is a great tool for measuring growth and engagement, and offers many powerful configuration options.

{% image src='/img/pages/getting-started/dashboard-guide/dashboard_summary.png' full center alt='Branch dashboard' %}

## Using link labels to segment data

As you most likely saw on the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) and [Creating Links in Other Ways]({{base.url}}/getting-started/creating-links-other-ways) pages, there are many options for creating links. If your organization is creating links in many different ways, it’s important to label them appropriately.

When you [set analytics labels for your links]({{base.url}}/getting-started/configuring-links/#analytics-labels), you can filter analytics data in the dashboard based on any of these options:

{% ingredient analytics-labels %}{% endingredient %}

Below is the filtering bar on the main [Summary page](https://dashboard.branch.io/#). You can find similar controls on a number of dashboard pages:

{% image src='/img/pages/getting-started/dashboard-guide/analytics_labels.png' full center alt='analytics filtering options' %}

## See link and click data in real time

The [Analytics page](https://dashboard.branch.io/#/analytics/content) allows you to see data on content your users are sharing, and which pieces of content are the most popular. You can also use the tabs on the [Live View page](https://dashboard.branch.io/#/liveview) to see generated links and link clicks in real time.

## Tracking events

Branch [tracks events for you]({{base.url}}/getting-started/tracking-events). We automatically record `install`, `open`, `web session start`, and `referred session`, and you can define as many custom events (sign ups, purchases, shares, etc.) as you wish. You can see these events as they occur on the [Events page](https://dashboard.branch.io/#/liveview/events/view).

## Tracking influencers

The [Influencers page](https://dashboard.branch.io/#/referrals/influencers) on the dashboard will show you who is driving the most new signups.

{% image src='/img/pages/getting-started/dashboard-guide/influencers.png' full center alt='analytics filtering options' %}

{% protip %}
You must [identify your users]({{base.url}}/getting-started/setting-identities) in order for the `User ID` column to be populated. The `Branch ID` refers to the internal Branch ID associated with that user. It is set automatically in the SDK.
{% endprotip %}

## Setting a custom link domain

While you may enjoy Branch, it doesn’t mean you need to have `bnc.lt` as a part of every link you send out. Setting up a custom subdomain is simple:

1. Procure a subdomain, like `get.myapp.co`. We strongly recommend you use subdomains instead of root domains, and preferably a subdomain of a different domain than your website.
1. Through your DNS provider, point the CNAME record for this subdomain to `custom.bnc.lt`.
1. After you’ve confirmed that the CNAME records have propagated throughout the internet, you simply enter your custom subdomain on the [Link Settings page](https://dashboard.branch.io/#/settings/link), under **Custom Link Domain**:

{% image src='/img/pages/getting-started/dashboard-guide/custom_link_domain.png' full center alt='configuring a custom subdomain' %}

## Controlling default link redirection behavior

By default, Branch will attempt to launch your app every single time a link is opened, before redirecting to the App Store or Play Store. On iOS 9, this can cause an ugly error message if the app is not yet installed. To reverse this default behavior, you can uncheck the **Always try to open app** box on the [Link Settings page](https://dashboard.branch.io/#/settings/link):

{% image src='/img/pages/getting-started/dashboard-guide/always_open_app.png' full center alt='setting link redirection default behavior' %}