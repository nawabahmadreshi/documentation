---
type: recipe
directory: getting-started
title: Organizing Link Data
page_title: Organizing link data in the Branch dashboard
description: "Learn about some basic setup and advanced features of the Branch dashboard"
android_description: "Learn about some advanced features of the Branch dashboard: How to set up a custom link domain and identify your best users."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, custom link domain, conversion funnel, funnels, influencers
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
contents: list
---

Now that your app is configured, it's time to dive into your data with the [Branch Dashboard](https://dashboard.branch.io){:target="_blank"}! The dashboard is a great tool for measuring growth and engagement, and offers many powerful configuration options.

{% image src='/img/pages/getting-started/organizing-link-data/dashboard_summary.png' full center alt='Branch dashboard' %}

## Using link labels to segment data

As you most likely saw on the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) and [Creating Links in Other Ways]({{base.url}}/getting-started/creating-links-other-ways) pages, there are many options for creating links. If your organization is creating links in many different ways, it’s important to label them appropriately.

When you [set analytics labels for your links]({{base.url}}/getting-started/configuring-links/#analytics-labels), you can filter analytics data in the dashboard based on any of these options:

{% ingredient analytics-labels %}{% endingredient %}

Below is the filtering bar on the [Source Analytics page](https://dashboard.branch.io/#/analytics/source){:target="_blank"}. You can find similar controls on a number of dashboard pages:

{% image src='/img/pages/getting-started/organizing-link-data/source-filters.png' full center alt='analytics filtering options' %}

## See link and click data in real time

Tabs for links, clicks, events, content, and more on the [Live View page](https://dashboard.branch.io/#/liveview){:target="_blank"} allow you to see generated data in real time.

{% image src='/img/pages/getting-started/organizing-link-data/live-view-events.png' full center alt='analytics filtering options' %}

## Controlling default link redirection behavior

By default, Branch will attempt to launch your app every single time a link is opened, before redirecting to the App Store or Play Store. On iOS 9, this can cause an ugly error message if the app is not yet installed. To reverse this default behavior, you can uncheck the **Always try to open app** box on the [Link Settings page](https://dashboard.branch.io/#/settings/link){:target="_blank"}:

{% image src='/img/pages/getting-started/organizing-link-data/always_open_app.png' full center alt='setting link redirection default behavior' %}